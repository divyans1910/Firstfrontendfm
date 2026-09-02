import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function Roadmap1() {
  const { navigateTo, showToast } = useApp();
  const [activeRealm, setActiveRealm] = useState('curiosity'); // 'forest', 'curiosity', 'sands', 'memory', 'crystal', 'nebula'

  // Realm data configuration for dynamic card rendering
  const realmsData = {
    forest: {
      title: 'Forest of Logic',
      status: 'Completed Realm',
      badgeClass: 'bg-primary/10 text-primary',
      icon: 'check_circle',
      stars: 3,
      description: 'You have successfully mastered all fundamental neural pathways and logical constructs. Revisit the ancient woods anytime to review your milestones.',
      progress: '100%',
      progressWidth: 'w-full',
      isLocked: false,
    },
    curiosity: {
      title: 'Curiosity Peaks',
      status: 'Active Realm',
      badgeClass: 'bg-tertiary-container text-on-tertiary-container',
      icon: null,
      stars: 3,
      description: 'Master the fundamentals of neural pathways while navigating the frosty cliffs of cognitive bias. Ascend to the summit of understanding.',
      progress: '64%',
      progressWidth: 'w-[64%]',
      isLocked: false,
    },
    sands: {
      title: 'Sands of Time',
      status: 'Locked Realm',
      badgeClass: 'bg-slate-100 text-slate-600',
      icon: 'lock',
      stars: 0,
      description: 'Traverse through historical paradigms and temporal loops. Complete previous realms to unlock this chronological expanse.',
      progress: '0%',
      progressWidth: 'w-0',
      isLocked: true,
    },
    memory: {
      title: 'Memory Mines',
      status: 'Locked Realm',
      badgeClass: 'bg-slate-100 text-slate-600',
      icon: 'lock',
      stars: 0,
      description: 'Delve deep into cognitive storage networks and retrieve lost data nodes. Complete Sands of Time to unlock.',
      progress: '0%',
      progressWidth: 'w-0',
      isLocked: true,
    },
    crystal: {
      title: 'Crystal Cavern',
      status: 'Locked Realm',
      badgeClass: 'bg-slate-100 text-slate-600',
      icon: 'lock',
      stars: 0,
      description: 'Refract your focus through complex crystalline structures of advanced problem-solving.',
      progress: '0%',
      progressWidth: 'w-0',
      isLocked: true,
    },
    nebula: {
      title: 'Nebula Volcano',
      status: 'Locked Realm',
      badgeClass: 'bg-slate-100 text-slate-600',
      icon: 'lock',
      stars: 0,
      description: 'The ultimate test of cognitive endurance amidst stellar pressures and high-velocity logic checks.',
      progress: '0%',
      progressWidth: 'w-0',
      isLocked: true,
    },
  };

  const currentRealm = realmsData[activeRealm];

  return (
    <main 
      id="view-roadmap-1" 
      className="view-container relative w-full overflow-hidden bg-surface-container-lowest group" 
      style={{ height: 'calc(100vh - 5rem)' }}
    >
      {/* Background Hero Image & Gradients (Dynamic based on active realm) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat rm1-hero-zoom origin-center scale-105 transition-all duration-700 ${
            activeRealm === 'forest' 
              ? "bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&auto=format&fit=crop&q=80')]" 
              : activeRealm === 'curiosity'
              ? "bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&auto=format&fit=crop&q=80')]"
              : activeRealm === 'sands'
              ? "bg-[url('https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&auto=format&fit=crop&q=80')]"
              : activeRealm === 'memory'
              ? "bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80')]"
              : activeRealm === 'crystal'
              ? "bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1600&auto=format&fit=crop&q=80')]"
              : "bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80')]"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/20" />
      </div>

      {/* Floating Active Realm Card */}
      <div className="absolute bottom-48 left-20 md:left-37 z-20 flex flex-col items-start max-w-sm md:max-w-md w-full">
        <div className="bg-white p-5 md:p-6 rounded-3xl w-full transform transition-transform group-hover:translate-x-1 duration-500 border border-outline-variant/30 shadow-2xl animate-fade-in min-h-[350px] flex flex-col justify-between">
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`${currentRealm.badgeClass} font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1`}>
                {currentRealm.icon && <span className="material-symbols-outlined text-xs">{currentRealm.icon}</span>}
                {currentRealm.status}
              </span>
              <div className="flex gap-0.5 text-amber-500">
                {currentRealm.stars > 0 ? (
                  Array.from({ length: currentRealm.stars }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 font-medium">Unranked</span>
                )}
              </div>
            </div>

            <h2 
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-1.5 drop-shadow-sm tracking-tight" 
              style={{ fontFamily: 'Sora, sans-serif', lineHeight: 1.15 }}
            >
              {currentRealm.title}
            </h2>
            
            <p className="text-xs md:text-sm text-slate-600 mb-4 leading-relaxed">
              {currentRealm.description}
            </p>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              {currentRealm.isLocked ? (
                <button 
                  type="button" 
                  onClick={() => showToast(currentRealm.title, 'Complete previous realms to unlock!', 'info')} 
                  className="bg-slate-200 text-slate-600 font-semibold text-sm px-5 py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-2 flex-1"
                >
                  <span className="material-symbols-outlined text-lg">lock</span>
                  Locked Realm
                </button>
              ) : activeRealm === 'forest' ? (
                <button 
                  type="button" 
                  onClick={() => showToast('Forest of Logic', 'Reviewing completed realm lessons...', 'success')} 
                  className="bg-primary text-on-primary font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2 group/btn cursor-pointer flex-1"
                >
                  <span className="material-symbols-outlined text-lg group-hover/btn:scale-110 transition-transform">visibility</span>
                  Review Realm
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={() => navigateTo('video')} 
                  className="bg-primary text-on-primary font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2 group/btn cursor-pointer flex-1"
                >
                  <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform">play_arrow</span>
                  Continue Adventure
                </button>
              )}
              <button 
                type="button" 
                onClick={() => navigateTo('roadmap-2')} 
                className="bg-slate-50 text-slate-800 border border-slate-200 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 cursor-pointer flex-1"
              >
                <span className="material-symbols-outlined text-lg">map</span>
                View Path
              </button>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Realm Progress</span>
                <span className="text-xs font-bold text-primary">{currentRealm.progress}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className={`bg-primary h-full rounded-full shadow-[0_0_10px_rgba(109,40,217,0.5)] ${currentRealm.progressWidth}`} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom World Map Navigation Dock - Solid Pure White */}
      <div className="absolute bottom-6 left-0 w-full z-20 px-4 md:px-12">
        <div className="bg-white rounded-2xl py-3 px-4 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-transparent flex items-center border border-slate-200 shadow-2xl max-w-5xl mx-auto">
          <span className="text-xs font-bold text-slate-700 whitespace-nowrap uppercase tracking-widest px-3 hidden md:block sticky left-0 z-20 bg-white py-2">
            World Map
          </span>
          
          <div className="flex items-center min-w-max px-2 mx-auto">
            {/* Node 1: Forest of Logic */}
            <div 
              className={`group/node flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 inline-flex ${
                activeRealm === 'forest' ? 'w-24 md:w-32 relative z-10' : 'w-20 md:w-28 opacity-80 hover:opacity-100'
              }`} 
              onClick={() => setActiveRealm('forest')}
            >
              <div className={`rounded-full border-3 bg-white p-1 relative overflow-hidden flex-shrink-0 transition-transform ${
                activeRealm === 'forest' 
                  ? 'w-14 h-14 md:w-18 md:h-18 border-primary shadow-[0_0_20px_rgba(109,40,217,0.6)] scale-110' 
                  : 'w-12 h-12 md:w-15 md:h-15 border-primary group-hover/node:scale-105 shadow-sm'
              }`}>
                <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&auto=format&fit=crop&q=80')" }} />
                <div className="absolute inset-0 bg-primary/25 flex items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-white drop-shadow-md text-base">check_circle</span>
                </div>
              </div>
              <span className={`text-xs text-center leading-tight truncate w-full ${activeRealm === 'forest' ? 'font-bold text-primary mt-0.5' : 'font-semibold text-slate-800'}`}>
                Forest of Logic
              </span>
            </div>

            <div className="w-6 md:w-10 border-t-2 border-primary border-dashed opacity-70 flex-shrink-0 mb-5" />

            {/* Node 2: Curiosity Peaks */}
            <div 
              className={`group/node flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 inline-flex ${
                activeRealm === 'curiosity' ? 'w-24 md:w-32 relative z-10' : 'w-20 md:w-28 opacity-80 hover:opacity-100'
              }`} 
              onClick={() => setActiveRealm('curiosity')}
            >
              <div className={`rounded-full border-3 bg-white p-1 relative overflow-hidden flex-shrink-0 transition-transform ${
                activeRealm === 'curiosity' 
                  ? 'w-14 h-14 md:w-18 md:h-18 border-primary shadow-[0_0_20px_rgba(109,40,217,0.6)] scale-110' 
                  : 'w-12 h-12 md:w-15 md:h-15 border-primary group-hover/node:scale-105 shadow-sm'
              }`}>
                <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&auto=format&fit=crop&q=80')" }} />
              </div>
              <span className={`text-xs text-center leading-tight truncate w-full ${activeRealm === 'curiosity' ? 'font-bold text-primary mt-0.5' : 'font-semibold text-slate-800'}`}>
                Curiosity Peaks
              </span>
            </div>

            <div className="w-6 md:w-10 border-t-2 border-slate-300 border-dashed opacity-70 flex-shrink-0 mb-5" />

            {/* Node 3: Sands of Time */}
            <div 
              className={`group/node flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 inline-flex ${
                activeRealm === 'sands' ? 'w-24 md:w-32 relative z-10' : 'w-20 md:w-28 opacity-80 hover:opacity-100'
              }`} 
              onClick={() => {
                setActiveRealm('sands');
                showToast('Sands of Time', 'Complete previous realms to unlock!', 'info');
              }}
            >
              <div className={`rounded-full border-3 bg-slate-50 p-1 relative overflow-hidden flex-shrink-0 transition-transform ${
                activeRealm === 'sands' 
                  ? 'w-14 h-14 md:w-18 md:h-18 border-slate-400 shadow-[0_0_15px_rgba(148,163,184,0.5)] scale-110' 
                  : 'w-12 h-12 md:w-15 md:h-15 border-slate-300 group-hover/node:scale-105 shadow-sm'
              }`}>
                <div className="w-full h-full rounded-full bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&auto=format&fit=crop&q=80')" }} />
                <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-white text-sm">lock</span>
                </div>
              </div>
              <span className={`text-xs text-center leading-tight truncate w-full ${activeRealm === 'sands' ? 'font-bold text-slate-900 mt-0.5' : 'font-semibold text-slate-800'}`}>
                Sands of Time
              </span>
            </div>

            <div className="w-6 md:w-10 border-t-2 border-slate-300 border-dashed opacity-70 flex-shrink-0 mb-5" />

            {/* Node 4: Memory Mines */}
            <div 
              className={`group/node flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 inline-flex ${
                activeRealm === 'memory' ? 'w-24 md:w-32 relative z-10' : 'w-20 md:w-28 opacity-80 hover:opacity-100'
              }`} 
              onClick={() => {
                setActiveRealm('memory');
                showToast('Memory Mines', 'Complete Sands of Time to unlock!', 'info');
              }}
            >
              <div className={`rounded-full border-3 bg-slate-50 p-1 relative overflow-hidden flex-shrink-0 transition-transform ${
                activeRealm === 'memory' 
                  ? 'w-14 h-14 md:w-18 md:h-18 border-slate-400 shadow-[0_0_15px_rgba(148,163,184,0.5)] scale-110' 
                  : 'w-12 h-12 md:w-15 md:h-15 border-slate-300 group-hover/node:scale-105 shadow-sm'
              }`}>
                <div className="w-full h-full rounded-full bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80')" }} />
                <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-white text-sm">lock</span>
                </div>
              </div>
              <span className={`text-xs text-center leading-tight truncate w-full ${activeRealm === 'memory' ? 'font-bold text-slate-900 mt-0.5' : 'font-semibold text-slate-800'}`}>
                Memory Mines
              </span>
            </div>

            <div className="w-6 md:w-10 border-t-2 border-slate-300 border-dashed opacity-70 flex-shrink-0 mb-5" />

            {/* Node 5: Crystal Cavern */}
            <div 
              className={`group/node flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 inline-flex ${
                activeRealm === 'crystal' ? 'w-24 md:w-32 relative z-10' : 'w-20 md:w-28 opacity-80 hover:opacity-100'
              }`} 
              onClick={() => {
                setActiveRealm('crystal');
                showToast('Crystal Cavern', 'Unlock previous realms first!', 'info');
              }}
            >
              <div className={`rounded-full border-3 bg-slate-50 p-1 relative overflow-hidden flex-shrink-0 transition-transform ${
                activeRealm === 'crystal' 
                  ? 'w-14 h-14 md:w-18 md:h-18 border-slate-400 shadow-[0_0_15px_rgba(148,163,184,0.5)] scale-110' 
                  : 'w-12 h-12 md:w-15 md:h-15 border-slate-300 group-hover/node:scale-105 shadow-sm'
              }`}>
                <div className="w-full h-full rounded-full bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&auto=format&fit=crop&q=80')" }} />
                <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-white text-sm">lock</span>
                </div>
              </div>
              <span className={`text-xs text-center leading-tight truncate w-full ${activeRealm === 'crystal' ? 'font-bold text-slate-900 mt-0.5' : 'font-semibold text-slate-800'}`}>
                Crystal Cavern
              </span>
            </div>

            <div className="w-6 md:w-10 border-t-2 border-slate-300 border-dashed opacity-70 flex-shrink-0 mb-5" />

            {/* Node 6: Nebula Volcano */}
            <div 
              className={`group/node flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 inline-flex ${
                activeRealm === 'nebula' ? 'w-24 md:w-32 relative z-10' : 'w-20 md:w-28 opacity-80 hover:opacity-100'
              }`} 
              onClick={() => {
                setActiveRealm('nebula');
                showToast('Nebula Volcano', 'Unlock previous realms first!', 'info');
              }}
            >
              <div className={`rounded-full border-3 bg-slate-50 p-1 relative overflow-hidden flex-shrink-0 transition-transform ${
                activeRealm === 'nebula' 
                  ? 'w-14 h-14 md:w-18 md:h-18 border-slate-400 shadow-[0_0_15px_rgba(148,163,184,0.5)] scale-110' 
                  : 'w-12 h-12 md:w-15 md:h-15 border-slate-300 group-hover/node:scale-105 shadow-sm'
              }`}>
                <div className="w-full h-full rounded-full bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80')" }} />
                <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-white text-sm">lock</span>
                </div>
              </div>
              <span className={`text-xs text-center leading-tight truncate w-full ${activeRealm === 'nebula' ? 'font-bold text-slate-900 mt-0.5' : 'font-semibold text-slate-800'}`}>
                Nebula Volcano
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}