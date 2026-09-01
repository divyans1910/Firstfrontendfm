import { BarChart2, Bot, LayoutGrid, Map, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const NAV_ITEMS = [
  { key: 'dashboard', view: 'dashboard', label: 'Dashboard', Icon: LayoutGrid },
  { key: 'roadmap', view: 'roadmap-1', label: 'Roadmap', Icon: Map },
  { key: 'ai-tutor', view: 'ai-tutor', label: 'AI Tutor', Icon: Bot },
  { key: 'progress', view: 'progress', label: 'Progress', Icon: BarChart2 },
];

const ACTIVE_BTN =
  'flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/25 transition-all';
const IDLE_BTN =
  'flex items-center gap-3.5 px-4 py-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-slate-800 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-all';

export default function Sidebar() {
  const { user, navKey, navigateTo, closeMobileSidebar, toggleSidebar, sidebarCollapsed, mobileSidebarOpen } = useApp();

  const classNames = [
    'w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between p-4 sm:p-5 z-30 flex-shrink-0 sticky top-0 md:h-screen transition-all duration-300',
    sidebarCollapsed ? 'collapsed' : '',
    mobileSidebarOpen ? 'mobile-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <div
        id="mobile-sidebar-backdrop"
        className={mobileSidebarOpen ? 'active' : ''}
        onClick={closeMobileSidebar}
      />

      <aside id="app-sidebar" className={classNames}>
        <div>
          <div className="flex items-center justify-between px-2 py-2 mb-6">
            <div className="flex items-center gap-3 cursor-pointer overflow-hidden" onClick={() => navigateTo('dashboard')}>
              <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30 flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="sidebar-brand-text">
                <div className="text-lg font-extrabold text-purple-600 dark:text-purple-400 font-display leading-tight">FutureMinds</div>
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">MYAIGURU</div>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                id={`sidebar-btn-${item.key}`}
                type="button"
                title={item.label}
                onClick={() => {
                  navigateTo(item.view);
                  closeMobileSidebar();
                }}
                className={`sidebar-btn w-full ${navKey === item.key ? ACTIVE_BTN : IDLE_BTN}`}
              >
                <item.Icon className="w-5 h-5 flex-shrink-0" />
                <span className="sidebar-text text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="sidebar-footer-card bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-slate-800/80 rounded-2xl p-3.5 border border-purple-100 dark:border-purple-900/40">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-purple-700 dark:text-purple-300">Daily Streak 🔥</span>
              <span className="global-user-streak text-amber-500 font-extrabold">{user.streak} Days</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-amber-400 to-purple-600 h-full rounded-full w-[85%] animate-pulse" />
            </div>
            <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="global-user-level font-semibold">Level {user.levelNumber}</span>
              <span className="global-user-xp font-bold text-purple-600 dark:text-purple-400">{user.xp.toLocaleString()} XP</span>
            </div>
          </div>

          <div
            className="sidebar-mini-badge items-center justify-center p-2 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold cursor-pointer"
            onClick={toggleSidebar}
            title={`${user.streak}-Day Streak • ${user.xp.toLocaleString()} XP`}
          >
            🔥 {user.streak}
          </div>
        </div>
      </aside>
    </>
  );
}
