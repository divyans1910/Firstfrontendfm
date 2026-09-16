import { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getAllContent, getContentTags, getContentTypes } from '../lib/loadContent.js';
import ContentGrid from './ContentGrid.jsx';
import ContentViewer from './content/ContentViewer.jsx';

export default function Library() {
  const items = useMemo(() => getAllContent(), []);
  const types = useMemo(() => getContentTypes(), []);
  const tags = useMemo(() => getContentTags(), []);
  const [typeFilter, setTypeFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = items.filter((item) => {
    if (typeFilter !== 'all' && item.type !== typeFilter) return false;
    if (tagFilter !== 'all' && !item.tags.includes(tagFilter)) return false;
    return true;
  });

  if (selected) {
    return (
      <main id="view-library" className="view-container p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-6">
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to library
        </button>
        <ContentViewer manifest={selected} />
      </main>
    );
  }

  return (
    <main id="view-library" className="view-container p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-6">
      <div>
        <div className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400">Library</div>
        <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Learning content</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Local lessons discovered from <code className="font-mono text-xs">content/**/manifest.json</code>. New types only need a renderer + registry line.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
          className="px-3 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="all">All types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          value={tagFilter}
          onChange={(event) => setTagFilter(event.target.value)}
          className="px-3 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="all">All tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <span className="text-[11px] font-bold text-slate-400">
          {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <ContentGrid items={filtered} onOpen={setSelected} />
    </main>
  );
}
