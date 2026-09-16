import MarkdownBody from '../MarkdownBody.jsx';

export default function SummaryRenderer({ manifest }) {
  return (
    <article className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-700/80 space-y-4">
      <header>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400">Summary</span>
        <h3 className="font-display text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">{manifest.title}</h3>
        {manifest.description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{manifest.description}</p>}
      </header>
      <MarkdownBody>{manifest.data?.body}</MarkdownBody>
    </article>
  );
}
