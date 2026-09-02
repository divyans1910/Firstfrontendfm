import { ArrowRight, BookOpen, Check, Compass, Zap, Flame, Lock, Trophy, Star, Award, Target, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function Roadmap2() {
  const { launchLesson, navigateTo, showToast } = useApp();

  return (
    <main id="view-roadmap-2" className="view-container p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Main Learning Pathway */}
        <div className="lg:col-span-2 bg-gradient-to-b from-white via-purple-50/40 to-indigo-50/20 dark:from-slate-900 dark:via-purple-950/20 dark:to-slate-900/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-purple-900/5 border border-purple-100 dark:border-purple-950/50 relative overflow-hidden flex flex-col items-center min-h-[960px]">
          
          {/* Decorative background ambient lighting and floating geometric elements */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/15 to-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 -left-20 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-[-10%] w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Floating decorative mini-badges */}
          <div className="absolute top-28 left-8 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-purple-200/50 dark:border-purple-800/40 shadow-sm animate-bounce duration-1000">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-[11px] font-black text-slate-700 dark:text-slate-200">Streak: 5 Days!</span>
          </div>

          <div className="absolute top-44 right-8 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-purple-200/50 dark:border-purple-800/40 shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="text-[11px] font-black text-slate-700 dark:text-slate-200">Top 10% Learner</span>
          </div>

          {/* Unit Header Card */}
          <div className="w-full bg-gradient-to-r from-[#6D28D9] via-purple-700 to-indigo-700 rounded-3xl p-6 sm:p-7 text-white shadow-2xl shadow-purple-600/30 flex items-center justify-between mb-8 z-20 relative overflow-hidden border border-purple-400/30">
            <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-24 h-24 bg-purple-400/20 rounded-full blur-lg pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-0.5 rounded-full bg-white/20 text-[10px] font-extrabold uppercase tracking-widest backdrop-blur-md border border-white/10">Chapter 02</span>
                <span className="text-purple-200 text-xs font-bold">Unit 01</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white drop-shadow-sm">Neural Foundations</h3>
              <p className="text-purple-100 text-xs sm:text-sm mt-1 font-medium max-w-md">Master the core concepts of perceptrons, hidden activation layers, and backpropagation optimization.</p>
            </div>
            
            <div className="relative z-10 hidden sm:flex flex-col items-end gap-2 flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
                <Award className="w-6 h-6 text-emerald-300" />
              </div>
              <span className="px-3.5 py-1.5 rounded-2xl bg-white/20 backdrop-blur-md text-xs font-black flex items-center gap-1.5 shadow-inner border border-white/10">
                <Check className="w-4 h-4 stroke-[3] text-emerald-300" />
                3/3 Done
              </span>
            </div>
          </div>

          {/* Interactive Wavy Roadmap Track with an exaggerated sine-like weave */}
          <div className="relative w-full max-w-md flex-1 flex flex-col justify-between py-6">
            <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md" viewBox="0 0 500 780" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M 240 10 C 380 60, 420 120, 390 190 C 360 260, 100 240, 110 330 C 120 420, 410 380, 390 480 C 370 580, 120 540, 160 650" stroke="url(#purpleGradient)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 160 650 C 180 700, 270 720, 310 760" stroke="#DDD6FE" strokeWidth="18" strokeLinecap="round" strokeDasharray="14 16" />
              <defs>
                <linearGradient id="purpleGradient" x1="240" y1="10" x2="160" y2="650" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#C084FC" />
                  <stop offset="0.5" stopColor="#7C3AED" />
                  <stop offset="1" stopColor="#4F46E5" />
                </linearGradient>
              </defs>
            </svg>

            {/* Node 1 - Aligned to exaggerated right peak */}
            <div className="relative z-10 flex justify-end pr-16 pt-4 group">
              <div className="absolute right-32 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 text-[11px] font-extrabold px-3.5 py-2 rounded-2xl shadow-xl pointer-events-none whitespace-nowrap backdrop-blur-md z-30 border border-slate-700/50 dark:border-slate-200/50">
                Introduction to AI
              </div>
              <button type="button" onClick={() => launchLesson('VIDEO', 'Introduction to AI')} className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-600/40 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all ring-4 ring-white dark:ring-slate-900 relative">
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Check className="w-7 h-7 stroke-[3]" />
              </button>
            </div>

            {/* Floating book between Node 1 and Node 2 */}
            <span className="relative z-20 block w-fit ml-4 my-1 text-3xl animate-bounce" aria-label="Book">📖</span>

            {/* Node 2 - Aligned to deep left trough */}
            <div className="relative z-10 flex justify-start pl-36 pt-4 group">
              <div className="absolute left-32 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 text-[11px] font-extrabold px-3.5 py-2 rounded-2xl shadow-xl pointer-events-none whitespace-nowrap backdrop-blur-md z-30 border border-slate-700/50 dark:border-slate-200/50">
                Introduction to Neural Basics 
              </div>
              <button type="button" onClick={() => launchLesson('VIDEO', 'Neural Basics')} className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-600/40 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all ring-4 ring-white dark:ring-slate-900 relative">
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Check className="w-7 h-7 stroke-[3]" />
              </button>
            </div>

            {/* Node 3 - Aligned to exaggerated right peak */}
            <div className="relative z-10 flex justify-end pr-36 pt-12 pb-4 group">
              <div className="absolute right-52 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 text-[11px] font-extrabold px-3.5 py-2 rounded-2xl shadow-xl pointer-events-none whitespace-nowrap backdrop-blur-md z-30 border border-slate-700/50 dark:border-slate-200/50">
                Weights & Biases
              </div>
              <button type="button" onClick={() => launchLesson('VIDEO', 'Weights & Biases')} className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-600/40 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all ring-4 ring-white dark:ring-slate-900 relative">
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Check className="w-7 h-7 stroke-[3]" />
              </button>
            </div>

            {/* Upcoming Unit Banner */}
            <div className="relative z-20 w-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-purple-200/70 dark:border-slate-700/80 rounded-2xl p-5 my-2 flex items-center justify-between shadow-xl shadow-indigo-950/5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black text-base shadow-md shadow-indigo-500/20">
                  U2
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-black text-slate-900 dark:text-white font-display">Unit 2: Large Language Models</h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Transformers, attention mechanisms, and scaling laws.</p>
                </div>
              </div>
              <span className="px-3.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-xs font-black text-purple-600 dark:text-purple-300 shadow-inner border border-purple-100 dark:border-purple-900/50">0/4</span>
            </div>

            {/* Active Next Lesson Node - Aligned to lower left curve */}
            <div className="relative z-10 flex justify-center -ml-16 pt-2 pb-6 group">
              <div className="absolute left-[calc(50%+3rem)] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 text-[11px] font-extrabold px-3.5 py-2 rounded-2xl shadow-xl pointer-events-none whitespace-nowrap backdrop-blur-md z-30 border border-slate-700/50 dark:border-slate-200/50">
                Neural Basics
              </div>
              <div className="flex flex-col items-center">
                <div className="px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white font-black text-[10px] shadow-lg shadow-purple-600/30 mb-2.5 flex items-center gap-1.5 animate-bounce whitespace-nowrap tracking-wider uppercase border border-white/20">
                  <span>Start Next Up</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-purple-500/50 dark:bg-purple-600/50 blur-2xl animate-pulse" />
                  <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-950/80 flex items-center justify-center border-4 border-dashed border-purple-500 dark:border-purple-500 relative shadow-xl">
                    <button type="button" onClick={() => launchLesson('VIDEO', 'Tokens & Data')} className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#6D28D9] via-purple-600 to-indigo-600 text-white shadow-2xl shadow-purple-600/60 flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer font-bold text-lg">
                      ▶
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          
          {/* Daily Quests Widget */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-700/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-5 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center shadow-inner border border-amber-200/50 dark:border-amber-900/50">
                  <Flame className="w-4 h-4 fill-current animate-pulse" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white text-base font-display">Daily Quests</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Boost your XP</p>
                </div>
              </div>
              <span className="text-[11px] font-black text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3 py-1 rounded-full border border-purple-100 dark:border-purple-900/50">Resets in 4h</span>
            </div>
            
            <div className="space-y-4 relative z-10">
              {/* Quest 1 */}
              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/70 space-y-2.5 transition-all hover:bg-slate-100/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center flex-shrink-0 shadow-inner border border-rose-200/50">
                    <Zap className="w-4 h-4 fill-current" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-800 dark:text-slate-200 font-extrabold">Earn 50 XP</span>
                      <span className="text-amber-600 dark:text-amber-400 font-black bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-md">15 / 50 XP</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden shadow-inner p-0.5">
                      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 h-full w-[30%] rounded-full transition-all duration-500 shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quest 2 */}
              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/70 space-y-2.5 transition-all hover:bg-slate-100/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center flex-shrink-0 shadow-inner border border-emerald-200/50">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-800 dark:text-slate-200 font-extrabold">Complete 2 lessons</span>
                      <span className="text-slate-400 font-bold bg-slate-200/60 dark:bg-slate-700 px-2 py-0.5 rounded-md">0 / 2</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden shadow-inner p-0.5">
                      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full w-0 rounded-full transition-all duration-500 shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Jump Widget */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-700/80 space-y-4 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-700 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shadow-inner border border-blue-200/50">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white text-base font-display">Quick Jump</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Roadmap Index</p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 relative z-10">
              {/* Unit 1 Jump */}
              <button type="button" onClick={() => showToast('Unit 1', 'Unit 1 Foundations is fully ready!', 'info')} className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/40 text-left transition-all group cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 font-black text-xs flex items-center justify-center shadow-inner border border-sky-200/50">1</div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 transition-colors">Foundations</div>
                    <div className="text-[10px] text-sky-500 font-extrabold uppercase tracking-wider">UNIT AVAILABLE</div>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-sky-50 dark:bg-sky-950/50 flex items-center justify-center">
                  <Check className="w-4 h-4 text-sky-500 stroke-[3]" />
                </div>
              </button>

              {/* Unit 2 Jump (Current) */}
              <button type="button" onClick={() => navigateTo('video')} className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-blue-50/90 to-indigo-50/90 dark:from-blue-950/50 dark:to-indigo-950/50 text-left transition-all border border-blue-200 dark:border-blue-800/80 shadow-md shadow-blue-500/5 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-md shadow-blue-600/30">2</div>
                  <div>
                    <div className="text-xs font-extrabold text-blue-950 dark:text-blue-100">Advanced Logic</div>
                    <div className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider">CURRENT UNIT</div>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform">
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </div>
              </button>

              {/* Unit 3 Jump (Locked) */}
              <button type="button" onClick={() => showToast('Locked', 'Finish Advanced Logic to unlock Neural Mastery!', 'info')} className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/30 text-left transition-all opacity-60 cursor-not-allowed group border border-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-400 font-bold text-xs flex items-center justify-center">3</div>
                  <div>
                    <div className="text-xs font-bold text-slate-600 dark:text-slate-400">Neural Mastery</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1 mt-0.5">
                      <Lock className="w-3 h-3" /> LOCKED
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <button type="button" onClick={() => navigateTo('roadmap-1')} className="w-full mt-4 py-3 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 text-xs font-extrabold text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition-colors text-center block cursor-pointer shadow-sm border border-blue-200/60 dark:border-blue-900/50">
              View Full Master Map
            </button>
          </div>

        </div>

      </div>
    </main>
  );
}