import { useApp } from '../context/AppContext.jsx';

export default function AuthFooter() {
  const { showToast } = useApp();

  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm py-4 px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
      <div>
        <span className="font-bold text-purple-700 dark:text-purple-400">FutureMinds</span> &copy; 2026 FutureMinds Educational Portal. All rights reserved.
      </div>
      <div className="flex items-center gap-5">
        <button type="button" onClick={() => showToast('Support', 'Help desk is open 24/7', 'info')} className="hover:text-purple-600 transition-colors">
          Support Center
        </button>
        <button type="button" onClick={() => showToast('Privacy', 'Your learning data is encrypted and private', 'info')} className="hover:text-purple-600 transition-colors">
          Privacy Policy
        </button>
        <button type="button" onClick={() => showToast('Terms', 'Standard terms of educational platform apply', 'info')} className="hover:text-purple-600 transition-colors">
          Terms of Service
        </button>
        <button type="button" onClick={() => showToast('Contact', 'hello@futureminds.ai', 'info')} className="hover:text-purple-600 transition-colors">
          Contact Us
        </button>
      </div>
    </footer>
  );
}
