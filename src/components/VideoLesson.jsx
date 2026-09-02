import { useState } from 'react';
import { Check, CheckCircle2, FileText, Lock, Maximize, Pause, Play, Settings, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const VIDEO_POSTER = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&auto=format&fit=crop&q=80';

const UNIT_STEPS = [
  { id: 1, title: '1. Introduction to AI', meta: 'Video • 12 mins', status: 'completed' },
  { id: 2, title: '2. Neural Basics', meta: 'Video • 18 mins • Playing', status: 'active' },
  { id: 3, title: '3. Activation Functions Lab', meta: 'Interactive • 25 mins', status: 'locked', toast: ['Locked Step', 'Complete current video lesson to unlock Activation Lab!'] },
  { id: 4, title: '4. Backpropagation Intro', meta: 'Video • 22 mins', status: 'locked', toast: ['Locked Step', 'Locked until previous lab is completed'] },
  { id: 5, title: '5. Unit 1 Quiz', meta: 'Assessment • 15 mins', status: 'locked', toast: ['Locked Step', 'Complete all lessons to unlock final unit quiz'] },
];

export default function VideoLesson() {
  const {
    video,
    navigateTo,
    showToast,
    toggleVideoPlay,
    switchVideoTab,
    saveVideoNote,
    discussionInput,
    setDiscussionInput,
    postDiscussionReply,
  } = useApp();
  const [notes, setNotes] = useState(video.notes);

  const tabClass = (tab) =>
    video.activeTab === tab
      ? 'pb-3 font-bold text-sm text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
      : 'pb-3 font-medium text-sm text-slate-500 dark:text-slate-400 hover:text-purple-600 border-b-2 border-transparent';

  return (
    <main id="view-video" className="view-container p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-6">
      {/* <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
        <button type="button" onClick={() => navigateTo('roadmap-1')} className="hover:text-purple-600">Learning Roadmap</button>
        <span>&gt;</span>
        <button type="button" onClick={() => navigateTo('roadmap-2')} className="hover:text-purple-600">Unit 1: Neural Foundations</button>
        <span>&gt;</span>
        <span className="text-purple-600 dark:text-purple-400 font-bold">Neural Basics</span>
      </nav> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl aspect-video border border-slate-800 flex flex-col justify-between group">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${VIDEO_POSTER}')`, backgroundPosition: 'top center' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 pointer-events-none" />

            <div className="relative z-10 p-5 flex items-start justify-between">
              <div>
                {/* <div className="text-[11px] font-extrabold uppercase tracking-wider text-purple-400">Video Lesson: Neural Foundations (FutureMinds)</div> */}
                <div className="text-xs text-white/80 font-medium">Lesson 2: Neural Basics</div>
              </div>
              {/* <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-white/40 flex items-center gap-3 max-w-xs animate-pulse">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-base flex-shrink-0">🧙‍♂️</div>
                <div>
                  <div className="text-[10px] font-extrabold text-purple-600 uppercase">Sage says:</div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">Pay close attention to the activation function section!</div>
                </div>
              </div> */}
            </div>

            <div className="relative z-10 my-auto mx-auto">
              <button
                id="video-center-play-btn"
                type="button"
                onClick={toggleVideoPlay}
                className="w-20 h-20 rounded-full bg-purple-600/90 hover:bg-purple-600 text-white backdrop-blur-md shadow-2xl flex items-center justify-center transform group-hover:scale-110 transition-all cursor-pointer"
              >
                {video.isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white ml-1" />}
              </button>
            </div>

            <div className="relative z-10 p-5 pt-0 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-white/90">
                {/* <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold">Aris Thorne</span>
                  <span className="text-white/60">• AI Researcher • 512 Students Watching</span>
                </div> */}
                {/* <div className="text-xs font-mono font-bold text-purple-300">Time Remaining: 01:12 / 2:00</div> */}
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden cursor-pointer relative" onClick={() => showToast('Scrubbed', 'Jumped timeline position', 'info')}>
                <div className="bg-purple-500 h-full w-[45%] rounded-full relative">
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md" />
                </div>
              </div>
              <div className="flex items-center justify-between text-white text-xs pt-1">
                <div className="flex items-center gap-4">
                  <button id="video-bottom-play-btn" type="button" onClick={toggleVideoPlay} className="hover:text-purple-400 transition-colors">
                    {video.isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>
                  <button type="button" onClick={() => showToast('Volume', 'Volume set to 100%', 'info')} className="hover:text-purple-400 transition-colors">
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <span className="text-[11px] text-white/70 font-mono">01:12 / 02:00</span>
                </div>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => showToast('Speed', 'Playback Speed: 1.0x', 'info')} className="hover:text-purple-400 text-xs font-bold font-mono">1.0x</button>
                  <button type="button" onClick={() => showToast('Transcript', 'Live transcript is running', 'info')} className="hover:text-purple-400 flex items-center gap-1 text-xs">
                    <FileText className="w-4 h-4" />
                    <span>Transcript</span>
                  </button>
                  <button type="button" onClick={() => showToast('Settings', 'Video quality: 1080p 60fps', 'info')} className="hover:text-purple-400">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button type="button" onClick={() => showToast('Fullscreen', 'Toggled fullscreen view', 'info')} className="hover:text-purple-400">
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-7 shadow-sm border border-slate-200/80 dark:border-slate-700/80 space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">Neural Basics</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Instructor: Dr. Alan Turing • 18 mins • Beginner Level</p>
            </div>

            <div className="border-b border-slate-200 dark:border-slate-700 flex items-center gap-8">
              <button id="video-tab-btn-overview" type="button" onClick={() => switchVideoTab('overview')} className={tabClass('overview')}>Overview</button>
              <button id="video-tab-btn-notes" type="button" onClick={() => switchVideoTab('notes')} className={tabClass('notes')}>Notes</button>
              <button id="video-tab-btn-discussion" type="button" onClick={() => switchVideoTab('discussion')} className={tabClass('discussion')}>Discussion</button>
            </div>

            {video.activeTab === 'overview' && (
              <div id="video-tab-pane-overview" className="space-y-5">
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  In this lesson, we dive into the fundamental building blocks of artificial neural networks. You will learn how biological inspiration led to the mathematical models we use today.
                </p>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2.5">Key Learning Objectives:</h4>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    {['Understand the anatomy of a perceptron.', 'Learn how weights and biases affect the output.', 'Discover why activation functions are critical for non-linear problem solving.'].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-purple-50/70 dark:bg-purple-950/40 rounded-2xl p-4 border border-purple-100 dark:border-purple-900/50 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center flex-shrink-0 text-sm">📝</div>
                  <div>
                    <div className="text-xs font-bold text-purple-900 dark:text-purple-300">Assignment Reminder</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">Complete the quick quiz at the end of this video to unlock the next interactive coding module.</div>
                  </div>
                </div>
              </div>
            )}

            {video.activeTab === 'notes' && (
              <div id="video-tab-pane-notes" className="space-y-4">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Your Study Notepad</label>
                <textarea
                  id="video-notes-input"
                  rows="5"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 font-mono leading-relaxed"
                  placeholder="Type your personal takeaways here..."
                />
                <div className="flex justify-end">
                  <button type="button" onClick={() => saveVideoNote(notes)} className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md hover:bg-purple-700 transition-all">
                    Save Notes
                  </button>
                </div>
              </div>
            )}

            {video.activeTab === 'discussion' && (
              <div id="video-tab-pane-discussion" className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="discussion-input"
                    value={discussionInput}
                    onChange={(event) => setDiscussionInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') postDiscussionReply();
                    }}
                    placeholder="Ask a question or share a thought..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-purple-600 text-slate-800 dark:text-slate-200"
                  />
                  <button type="button" onClick={postDiscussionReply} className="px-4 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition-all">
                    Post
                  </button>
                </div>
                <div id="discussion-thread-container" className="space-y-3">
                  {video.discussion.map((item, index) => (
                    <div key={`${item.author}-${index}`} className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/60 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {item.author.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">{item.author}</span>
                          <span className="text-[10px] text-slate-400">{item.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-700/80 space-y-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400">UNIT 1</span>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display mt-0.5">Neural Foundations</h3>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex-1 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full w-1/4 rounded-full" />
              </div>
              <span className="text-xs font-bold text-slate-400">25%</span>
            </div>
          </div>

          <div className="space-y-2.5">
            {UNIT_STEPS.map((step) => {
              if (step.status === 'completed') {
                return (
                  <div key={step.id} onClick={() => showToast('Lesson 1', 'Replaying Introduction to AI', 'info')} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-100 dark:hover:bg-slate-700/70 border border-slate-100 dark:border-slate-700 cursor-pointer flex items-center justify-between transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{step.title}</div>
                        <div className="text-[10px] text-slate-400">{step.meta}</div>
                      </div>
                    </div>
                  </div>
                );
              }
              if (step.status === 'active') {
                return (
                  <div key={step.id} className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border-2 border-purple-600 dark:border-purple-500 shadow-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-purple-900 dark:text-purple-200">{step.title}</div>
                        <div className="text-[10px] font-bold text-purple-600 dark:text-purple-400">{step.meta}</div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div key={step.id} onClick={() => showToast(step.toast[0], step.toast[1], 'info')} className="p-3.5 rounded-2xl opacity-60 flex items-center justify-between cursor-not-allowed">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">{step.title}</div>
                      <div className="text-[10px] text-slate-400">{step.meta}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
