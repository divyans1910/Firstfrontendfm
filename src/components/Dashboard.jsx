import { useRef } from 'react';
import {
  Atom,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Compass,
  Flame,
  FlaskConical,
  List,
  Lock,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import ChapterCard from './ChapterCard.jsx';

const LEADERBOARD = [
  { rank: 1, initials: 'AS', name: 'Arjun S.', xp: '12.4k XP', highlight: 'first' },
  { rank: 2, initials: 'PV', name: 'Priya V.', xp: '11.8k XP' },
  { rank: 3, initials: 'IM', name: 'Ishaan M.', xp: '11.2k XP', bronze: true },
];

const ACHIEVEMENTS = [
  {
    title: 'Perceptron Pioneer',
    icon: Atom,
    className: 'bg-purple-100 dark:bg-purple-950 text-purple-600',
  },
  {
    title: 'Hot Streak',
    icon: Flame,
    className: 'bg-rose-100 dark:bg-rose-950 text-rose-600',
  },
  {
    title: 'Explorer',
    icon: Compass,
    className: 'bg-sky-100 dark:bg-sky-950 text-sky-600',
  },
  {
    title: 'Lab Master',
    icon: FlaskConical,
    className: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600',
  },
  {
    title: 'Spark of Genius',
    icon: Sparkles,
    className: 'bg-amber-100 dark:bg-amber-950 text-amber-600',
  },
  {
    title: 'Verified Scholar',
    icon: ShieldCheck,
    className: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600',
  },
  {
    title: 'Locked',
    icon: Lock,
    className: 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-dashed border-slate-300 dark:border-slate-700',
    locked: true,
  },
  {
    title: 'Locked',
    icon: Lock,
    className: 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-dashed border-slate-300 dark:border-slate-700',
    locked: true,
  },
];

export default function Dashboard() {
  const { user, chapters, navigateTo, showToast } = useApp();
  const scrollerRef = useRef(null);

  const scrollChapters = (offset) => {
    scrollerRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <main id="view-dashboard" className="view-container p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
       <div className="lg:col-span-2 bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg shadow-purple-500/20 flex flex-col justify-between">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              GRADE 6
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Welcome Back, <span className="global-user-name">{user.name.split(' ')[0]}</span>
            </h2>
            <p className="text-purple-100 text-xs sm:text-sm mt-2 max-w-lg leading-relaxed">
              You&apos;re on a legendary {user.streak}-day streak! Your momentum is unstoppable, keep pushing those boundaries.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex-1 max-w-xs">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5 text-purple-100 uppercase tracking-wider">
                <span>Unit Progress</span>
                <span>Unit 1</span>
              </div>
              <div className="w-full bg-black/20 h-2.5 rounded-full overflow-hidden p-0.5">
                <div className="bg-purple-200 h-full rounded-full w-1/3 transition-all duration-500 shadow-sm" />
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                navigateTo('video');
                showToast('Resuming Lesson', 'Now playing: Neural Basics', 'info');
              }}
              className="px-7 py-3 rounded-2xl bg-white text-purple-600 font-extrabold text-xs uppercase tracking-wider shadow-lg hover:bg-purple-50 transition-all hover:scale-105 active:scale-100 whitespace-nowrap"
            >
              Continue
            </button>
          </div>

          <div className="absolute right-6 top-6 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center transform rotate-12 pointer-events-none">
            <Sparkles className="h-7 w-7 text-purple-100 drop-shadow-sm" aria-label="Celebration" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-7 shadow-sm border border-purple-100/70 dark:border-slate-700/60 relative flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-3xl shadow-inner overflow-hidden">
              <img src='/dist/assets/eli.gif' alt="Elephant" className="w-14 h-14 object-cover" />
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
          </div>
          <div className="my-4">
            <div className="text-[11px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-1">ELI SAYS...</div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              &quot;A wise elephant never forgets that every great journey begins with a single step. You&apos;ve mastered 33% of this unit, keep those foundations strong, and the rest will follow beautifully!&quot;
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] font-bold text-slate-400">
            <span>Personal Coach</span>
            <button type="button" onClick={() => navigateTo('ai-tutor')} className="text-purple-600 dark:text-purple-400 hover:underline">
              Ask Eli →
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">Chapters</h3>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider bg-purple-50 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-full">33% UNIT PROGRESS</span>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => scrollChapters(-340)} className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors shadow-sm" title="Previous Chapters">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => scrollChapters(340)} className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors shadow-sm" title="Next Chapters">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div id="dashboard-chapters-container" ref={scrollerRef} className="horizontal-scroll-container gap-4 pb-3 pt-1">
            {chapters.map((chapter) => (
              <ChapterCard key={chapter.id} chapter={chapter} />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Lab Activity</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Perceptron Training', meta: 'Neural Foundations • 2h ago' },
                    { title: 'Backpropagation Basics', meta: 'Optimization • Yesterday' },
                  ].map((lab) => (
                    <div key={lab.title} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer" onClick={() => navigateTo('video')}>
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center text-xs">🧪</div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{lab.title}</div>
                          <div className="text-[10px] text-slate-400">{lab.meta}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
              <button type="button" onClick={() => navigateTo('video')} className="w-full mt-4 py-2.5 rounded-2xl bg-purple-50 dark:bg-slate-700 text-purple-700 dark:text-purple-300 font-bold text-xs hover:bg-purple-100 transition-colors flex items-center justify-center gap-1.5">
                <List className="w-3.5 h-3.5" />
                <span>VIEW ALL</span>
              </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Schedule</h4>
                </div>
                <div className="space-y-3">
                  <div className="p-2.5 rounded-xl border-l-4 border-rose-500 bg-rose-50/50 dark:bg-rose-950/20">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-rose-600 uppercase">● DUE SOON</span>
                      <span className="text-slate-500 dark:text-slate-400">Fri 11:59 PM</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">Neural Networks Project</div>
                    <div className="text-[10px] text-slate-500">Unit 1 Capstone</div>
                  </div>
                  <div className="p-2.5 rounded-xl border-l-4 border-purple-500 bg-purple-50/50 dark:bg-purple-950/20">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-purple-600 uppercase">UPCOMING</span>
                      <span className="text-slate-500 dark:text-slate-400">Wednesday</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">Neural Networks Project</div>
                    <div className="text-[10px] text-slate-500">Module 02 • In 2 days</div>
                  </div>
                </div>
              </div>
              <button type="button" onClick={() => showToast('Calendar', 'Full calendar scheduled for Term 1', 'info')} className="w-full mt-4 py-2.5 rounded-2xl bg-purple-50 dark:bg-slate-700 text-purple-700 dark:text-purple-300 font-bold text-xs hover:bg-purple-100 transition-colors flex items-center justify-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>OPEN CALENDAR</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-700/80">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display mb-4">Leaderboard</h3>
            <div className="space-y-3">
              {LEADERBOARD.map((row) => (
                <div key={row.rank} className={`flex items-center justify-between p-2 rounded-2xl ${row.highlight === 'first' ? 'bg-slate-50 dark:bg-slate-700/40' : 'hover:bg-slate-50 dark:hover:bg-slate-700/30'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-black w-4 text-center ${row.rank === 1 ? 'text-amber-500' : row.bronze ? 'text-amber-700' : 'text-slate-400'}`}>{row.rank}</span>
                    <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center ${row.rank === 1 ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300' : row.bronze ? 'bg-amber-50 dark:bg-amber-950 text-amber-800' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>{row.initials}</div>
                    <span className={`text-xs ${row.rank === 1 ? 'font-bold' : 'font-semibold'} text-slate-800 dark:text-slate-200`}>{row.name}</span>
                  </div>
                  <span className={`text-xs ${row.rank === 1 ? 'font-extrabold text-slate-700 dark:text-slate-300' : 'font-bold text-slate-600 dark:text-slate-400'}`}>{row.xp}</span>
                </div>
              ))}
              <div className="text-center text-slate-400 text-xs py-0.5">• • •</div>
              <div className="flex items-center justify-between p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-purple-600 dark:text-purple-400 w-4 text-center">6</span>
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">DN</div>
                  <span className="text-xs font-bold text-purple-900 dark:text-purple-200">{user.name}</span>
                </div>
                <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400">10.2k XP</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-700/80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">Achievements</h3>
              <button type="button" onClick={() => navigateTo('progress')} className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {ACHIEVEMENTS.map((badge, index) => {
                const Icon = badge.icon;

                return (
                  <div
                    key={`${badge.title}-${index}`}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg ${badge.className} ${badge.locked ? '' : 'shadow-sm hover:scale-110 transition-transform cursor-pointer'}`}
                    title={badge.title}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
