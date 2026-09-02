import { Check, Clock, Lock, Play, X } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

function typeStyles(type) {
  if (type === 'VIDEO') return 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300';
  if (type === 'LAB') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300';
  return 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300';
}

export default function ChapterModal() {
  const { chapterModalOpen, closeChapterModal, chapters, selectedChapter, selectedChapterId, selectModalChapter, launchLesson } = useApp();

  if (!chapterModalOpen || !selectedChapter) return null;

  const isCurrentChapterLocked = selectedChapter.status === 'locked';

  const progress = selectedChapter.lessonsCount && !isCurrentChapterLocked
    ? `${Math.round((selectedChapter.completedLessons / selectedChapter.lessonsCount) * 100)}%`
    : '0%';

  return (
    <div id="chapter-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 modal-backdrop">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 id="modal-chapter-title" className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 font-display">
              Chapter {selectedChapter.number}: {selectedChapter.title}
            </h2>
            <div className="flex items-center gap-3 mt-1.5">
              <span id="modal-chapter-count" className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {isCurrentChapterLocked ? 'Locked Chapter' : `${selectedChapter.completedLessons} of ${selectedChapter.lessonsCount} Lessons Complete`}
              </span>
              {!isCurrentChapterLocked && (
                <div className="w-28 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: progress }} />
                </div>
              )}
            </div>
          </div>
          <button type="button" onClick={closeChapterModal} className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 flex-1 overflow-y-auto min-h-0">
          <div id="modal-chapters-sidebar" className="p-4 border-r border-slate-100 dark:border-slate-800 space-y-2 bg-slate-50/50 dark:bg-slate-900/50">
            {chapters.map((chapter) => {
              const isSelected = chapter.id === selectedChapterId;
              const isCompleted = chapter.status === 'completed';
              const isLocked = chapter.status === 'locked';
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => selectModalChapter(chapter.id)}
                  className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3.5 border transition-all ${
                    isSelected
                      ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/60 shadow-sm'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border-transparent'
                  }`}
                >
                  {isCompleted ? (
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 stroke-2" />
                    </div>
                  ) : !isLocked ? (
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                  )}
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">CHAPTER {chapter.number}</div>
                    <div className={`text-sm font-semibold truncate ${isLocked ? 'text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>{chapter.title}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div id="modal-lessons-list" className="md:col-span-2 p-6 space-y-4 overflow-y-auto">
            {selectedChapter.lessons?.map((lesson) => (
              <div 
                key={lesson.id} 
                className={`bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isCurrentChapterLocked ? 'opacity-60' : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {isCurrentChapterLocked ? (
                      <Lock className="w-4 h-4" />
                    ) : lesson.completed ? (
                      <Check className="w-5 h-5 stroke-2 text-purple-600 dark:text-purple-400" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">{lesson.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{lesson.desc}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${typeStyles(lesson.type)}`}>{lesson.type}</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {lesson.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={isCurrentChapterLocked}
                  onClick={() => !isCurrentChapterLocked && launchLesson(lesson.type, lesson.title)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap self-end sm:self-center ${
                    isCurrentChapterLocked
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-700'
                      : 'border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:text-white'
                  }`}
                >
                  {isCurrentChapterLocked ? 'Locked' : lesson.completed ? 'Replay' : 'Start'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}