import { useMemo, useState } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import { resolveContentAsset } from '../../../lib/loadContent.js';

function parseOutline(outline) {
  const root = { label: 'Mindmap', children: [] };
  const stack = [{ indent: -1, node: root }];
  String(outline || '')
    .split('\n')
    .map((line) => line.replace(/\t/g, '  '))
    .filter((line) => line.trim())
    .forEach((line) => {
      const indent = (line.match(/^ */)?.[0].length || 0) / 2;
      const label = line.replace(/^\s*[-*]\s*/, '').trim();
      const node = { label, children: [] };
      while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
      stack[stack.length - 1].node.children.push(node);
      stack.push({ indent, node });
    });
  return root.children.length === 1 ? root.children[0] : { label: 'Overview', children: root.children };
}

function OutlineNode({ node, depth = 0 }) {
  return (
    <div className={depth === 0 ? '' : 'ml-5 mt-2'}>
      <div
        className={`inline-flex px-3 py-1.5 rounded-xl text-sm font-semibold border ${
          depth === 0
            ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20'
            : depth === 1
              ? 'bg-purple-50 dark:bg-purple-950/50 text-purple-800 dark:text-purple-200 border-purple-100 dark:border-purple-900/50'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
        }`}
      >
        {node.label}
      </div>
      {node.children?.length > 0 && (
        <div className="mt-2 border-l border-purple-200 dark:border-purple-800 pl-1">
          {node.children.map((child) => (
            <OutlineNode key={`${depth}-${child.label}`} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MindmapRenderer({ manifest }) {
  const data = manifest.data || {};
  const [zoom, setZoom] = useState(1);
  const imageSrc = data.imagePath ? resolveContentAsset(manifest, data.imagePath) : '';
  const tree = useMemo(() => (data.format === 'markdown' || data.outline ? parseOutline(data.outline) : null), [data.format, data.outline]);

  return (
    <article className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm border border-slate-200/80 dark:border-slate-700/80 space-y-4">
      <header className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400">Mindmap</span>
          <h3 className="font-display text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">{manifest.title}</h3>
          {manifest.description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{manifest.description}</p>}
        </div>
        {imageSrc && (
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => setZoom((value) => Math.max(0.5, Number((value - 0.25).toFixed(2))))} className="w-8 h-8 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-700">
              <Minus className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => setZoom((value) => Math.min(3, Number((value + 0.25).toFixed(2))))} className="w-8 h-8 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-700">
              <Plus className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => setZoom(1)} className="w-8 h-8 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-700">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </header>

      {imageSrc ? (
        <div className="w-full overflow-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 max-h-[28rem]">
          <img src={imageSrc} alt={manifest.title} className="max-w-none origin-top-left" style={{ width: `${zoom * 100}%` }} />
        </div>
      ) : tree ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-5 overflow-auto">
          <OutlineNode node={tree} />
        </div>
      ) : (
        <div className="p-10 text-center text-sm text-slate-400 rounded-2xl border border-dashed border-slate-300 dark:border-slate-600">
          Add an imagePath or a markdown outline to this mindmap.
        </div>
      )}
    </article>
  );
}
