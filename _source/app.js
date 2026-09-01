/**
 * FutureMinds Learning Platform
 * Core Application Controller & State Management
 */

// Global State
const state = {
  user: {
    name: "Divya N",
    alias: "Aanya Sharma",
    email: "divya@futureminds.demo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    level: "Level 12 Apprentice",
    levelNumber: 12,
    xp: 2450,
    streak: 12,
    grade: "Grade 6",
    school: "FutureMinds AI Labs, Delhi",
    learningGoal: "Master Neural Networks & Python",
    darkThemeUnlocked: false,
    aiHoursUnlocked: 0,
    redeemedItems: []
  },
  currentView: 'student-login', // 'role-select', 'student-login', 'dashboard', 'roadmap-1', 'roadmap-2', 'video', 'ai-tutor', 'progress', 'settings'
  activeChapterModal: false,
  selectedChapterId: 1,
  activeProfileDropdown: false,
  activeNotificationDropdown: false,
  currentTheme: 'light', // 'light', 'dark', 'system'

  // AI Tutor State
  aiTutor: {
    currentSessionId: 1,
    isTyping: false,
    sessions: [
      {
        id: 1,
        title: "How Does AI Actually...",
        messages: [
          {
            sender: "owl",
            name: "Professor Owl",
            avatar: "owl",
            text: "When you look at a dog, do you identify the whole image instantly, or do you notice features like ears, eyes, fur, and shape first?"
          },
          {
            sender: "user",
            name: "Madhura",
            text: "How does AI recognize images?"
          },
          {
            sender: "owl",
            name: "Professor Owl",
            avatar: "owl",
            text: "Interesting. If humans recognize features before identifying an object, how might an AI model approach the same problem?"
          }
        ]
      },
      {
        id: 2,
        title: "Difference Between AI...",
        messages: [
          {
            sender: "owl",
            name: "Professor Owl",
            avatar: "owl",
            text: "Welcome back! What would you like to explore today? We can dive into the difference between Artificial Intelligence, Machine Learning, and Deep Learning!"
          }
        ]
      },
      {
        id: 3,
        title: "Prompt Writing Practice",
        messages: [
          {
            sender: "owl",
            name: "Professor Owl",
            avatar: "owl",
            text: "Let's practice crafting high-precision prompts for Large Language Models. Try giving me a prompt with a persona, clear task, and constraints!"
          }
        ]
      },
      {
        id: 4,
        title: "Understanding Neural...",
        messages: [
          {
            sender: "owl",
            name: "Professor Owl",
            avatar: "owl",
            text: "In artificial neurons, inputs are weighted, summed, and passed through an activation function like ReLU or Sigmoid. Ready for a quick challenge?"
          }
        ]
      },
      {
        id: 5,
        title: "Can AI Think Like Hum...",
        messages: [
          {
            sender: "owl",
            name: "Professor Owl",
            avatar: "owl",
            text: "That touches on the classic Turing Test and Searle's Chinese Room argument! What are your thoughts on computational consciousness?"
          }
        ]
      }
    ]
  },

  // Chapters Data
  chapters: [
    {
      id: 1,
      number: "01",
      title: "Intro to AI",
      status: "completed",
      lessonsCount: 3,
      completedLessons: 3,
      tags: ["History", "Turing Test", "Modern AI"],
      lessons: [
        { id: 101, title: "History of AI", desc: "Explore the origins from Alan Turing to the first neural networks.", type: "VIDEO", duration: "12 mins", completed: true },
        { id: 102, title: "Turing Test", desc: "Understand the benchmark for machine intelligence and its modern critiques.", type: "LAB", duration: "25 mins", completed: true },
        { id: 103, title: "Modern AI", desc: "A look at LLMs, Generative AI, and the current state of the field.", type: "QUIZ", duration: "10 mins", completed: true }
      ]
    },
    {
      id: 2,
      number: "02",
      title: "Tokens & Data",
      status: "active",
      lessonsCount: 3,
      completedLessons: 1,
      tags: ["Text Tokenization", "Word Embeddings", "Data Cleaning"],
      lessons: [
        { id: 201, title: "Text Tokenization Basics", desc: "How words, subwords, and characters are converted into numerical tokens.", type: "VIDEO", duration: "14 mins", completed: true },
        { id: 202, title: "Word Embeddings & Vectors", desc: "Mapping high-dimensional semantic relationships into vector spaces.", type: "LAB", duration: "20 mins", completed: false },
        { id: 203, title: "Data Preprocessing & Ethics", desc: "Handling noise, deduplication, and ethical considerations in datasets.", type: "QUIZ", duration: "15 mins", completed: false }
      ]
    },
    {
      id: 3,
      number: "03",
      title: "Weights & Biases",
      status: "locked",
      lessonsCount: 4,
      completedLessons: 0,
      tags: ["Matrix Math", "Loss Functions", "Optimization"],
      lessons: [
        { id: 301, title: "Neural Weights & Linearity", desc: "Connecting mathematical weights to biological synapses.", type: "VIDEO", duration: "16 mins", completed: false },
        { id: 302, title: "Biases and Activation Offsets", desc: "Why biases prevent zero-input collapse.", type: "LAB", duration: "18 mins", completed: false }
      ]
    },
    {
      id: 4,
      number: "04",
      title: "Neural Architectures",
      status: "locked",
      lessonsCount: 4,
      completedLessons: 0,
      tags: ["FeedForward", "CNNs", "Transformers"],
      lessons: [
        { id: 401, title: "Feedforward Deep Networks", desc: "Multi-layer perceptron topology and depth benefits.", type: "VIDEO", duration: "20 mins", completed: false }
      ]
    },
    {
      id: 5,
      number: "05",
      title: "Optimization",
      status: "locked",
      lessonsCount: 3,
      completedLessons: 0,
      tags: ["Gradient Descent", "Adam", "Learning Rates"],
      lessons: [
        { id: 501, title: "Gradient Descent in Action", desc: "Traversing loss landscapes and finding global minima.", type: "VIDEO", duration: "22 mins", completed: false }
      ]
    },
    {
      id: 6,
      number: "06",
      title: "Ethics & Safety",
      status: "locked",
      lessonsCount: 3,
      completedLessons: 0,
      tags: ["Alignment", "Fairness", "Governance"],
      lessons: [
        { id: 601, title: "AI Alignment Foundations", desc: "Ensuring models behave safely and predictably.", type: "VIDEO", duration: "15 mins", completed: false }
      ]
    }
  ],

  // Video Learning state
  video: {
    isPlaying: false,
    currentTime: 1222, // in seconds ~ 20:22 / 45:00
    duration: 2700, // 45:00
    activeTab: 'overview', // 'overview', 'notes', 'discussion'
    notes: "• Perceptrons compute y = σ(w·x + b)\n• Activation functions introduce non-linearity so the network can fit arbitrary complex curves.\n• ReLU is standard for hidden layers to avoid vanishing gradients.",
    discussion: [
      { author: "Aris Thorne", time: "2h ago", text: "Remember to review the difference between step functions and continuous sigmoid curves before attempting tomorrow's lab!" },
      { author: "Priya V.", time: "1h ago", text: "The visual analogy with the light switch made activation functions finally click for me!" }
    ]
  }
};

// UI Notification Toast
function showToast(title, message, icon = 'info') {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = 'flex items-center gap-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-2xl shadow-xl border border-purple-100 dark:border-purple-900/50 transform transition-all duration-300 translate-y-4 opacity-0 z-50';
  
  let iconSvg = `<svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
  if (icon === 'success') {
    iconSvg = `<svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
  } else if (icon === 'star') {
    iconSvg = `<svg class="w-5 h-5 text-amber-500 fill-amber-500" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <div class="flex flex-col">
      <span class="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">${title}</span>
      <span class="text-sm font-medium text-slate-700 dark:text-slate-200">${message}</span>
    </div>
  `;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Router and View Navigator
function navigateTo(viewName) {
  state.currentView = viewName;
  closeAllModals();

  const isAuthPage = (viewName === 'student-login' || viewName === 'role-select');
  const appShell = document.getElementById('app-shell');
  const authShell = document.getElementById('auth-shell');

  if (isAuthPage) {
    if (appShell) appShell.classList.add('hidden');
    if (authShell) authShell.classList.remove('hidden');

    const studentLogin = document.getElementById('view-student-login');
    const roleSelect = document.getElementById('view-role-select');

    if (studentLogin) studentLogin.classList.toggle('hidden', viewName !== 'student-login');
    if (roleSelect) roleSelect.classList.toggle('hidden', viewName !== 'role-select');
  } else {
    if (authShell) authShell.classList.add('hidden');
    if (appShell) appShell.classList.remove('hidden');

    // Update views inside app shell
    const views = [
      'view-dashboard',
      'view-roadmap-1',
      'view-roadmap-2',
      'view-video',
      'view-ai-tutor',
      'view-progress',
      'view-settings'
    ];

    views.forEach(v => {
      const el = document.getElementById(v);
      if (el) el.classList.add('hidden');
    });

    const activeEl = document.getElementById(`view-${viewName}`);
    if (activeEl) {
      activeEl.classList.remove('hidden');
      activeEl.classList.add('view-container');
    }

    // Update active indicators in sidebar & top nav
    updateNavIndicators(viewName);
  }

  // Refresh icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavIndicators(viewName) {
  // Sidebar items
  const navKeys = ['dashboard', 'roadmap', 'ai-tutor', 'progress'];
  
  // Normalizing roadmap views to 'roadmap' tab
  let normalizedKey = viewName;
  if (viewName === 'roadmap-1' || viewName === 'roadmap-2' || viewName === 'video') {
    normalizedKey = 'roadmap';
  }

  navKeys.forEach(key => {
    // Sidebar
    const sideBtn = document.getElementById(`sidebar-btn-${key}`);
    if (sideBtn) {
      if (key === normalizedKey) {
        sideBtn.className = "flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/25 transition-all";
      } else {
        sideBtn.className = "flex items-center gap-3.5 px-4 py-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-slate-800 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-all";
      }
    }

    // Top nav bar
    const topBtn = document.getElementById(`topnav-btn-${key}`);
    if (topBtn) {
      if (key === normalizedKey) {
        topBtn.className = "relative text-sm font-bold text-purple-600 dark:text-purple-400 pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-purple-600 dark:after:bg-purple-400 after:rounded-full";
      } else {
        topBtn.className = "relative text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 pb-1 transition-colors";
      }
    }
  });

  // Sync user state in all relevant places
  renderGlobalCounters();
}

function renderGlobalCounters() {
  document.querySelectorAll('.global-user-xp').forEach(el => {
    el.textContent = state.user.xp.toLocaleString() + " XP";
  });
  document.querySelectorAll('.global-user-streak').forEach(el => {
    el.textContent = state.user.streak + " Days";
  });
  document.querySelectorAll('.global-user-level').forEach(el => {
    el.textContent = state.user.level;
  });
  document.querySelectorAll('.global-user-name').forEach(el => {
    el.textContent = state.user.name;
  });
}

// Modals and Dropdowns
function toggleProfileDropdown(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('profile-dropdown');
  if (!dropdown) return;
  state.activeProfileDropdown = !state.activeProfileDropdown;
  dropdown.classList.toggle('hidden', !state.activeProfileDropdown);
  if (state.activeProfileDropdown) {
    document.getElementById('notification-dropdown')?.classList.add('hidden');
    state.activeNotificationDropdown = false;
  }
}

function toggleNotificationDropdown(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('notification-dropdown');
  if (!dropdown) return;
  state.activeNotificationDropdown = !state.activeNotificationDropdown;
  dropdown.classList.toggle('hidden', !state.activeNotificationDropdown);
  if (state.activeNotificationDropdown) {
    document.getElementById('profile-dropdown')?.classList.add('hidden');
    state.activeProfileDropdown = false;
  }
}

function closeAllModals() {
  const profileDropdown = document.getElementById('profile-dropdown');
  if (profileDropdown) profileDropdown.classList.add('hidden');
  state.activeProfileDropdown = false;

  const notifDropdown = document.getElementById('notification-dropdown');
  if (notifDropdown) notifDropdown.classList.add('hidden');
  state.activeNotificationDropdown = false;

  const chModal = document.getElementById('chapter-modal');
  if (chModal) chModal.classList.add('hidden');
  state.activeChapterModal = false;
}

// Chapter Modal Logic
function openChapterModal(chapterId = 1) {
  state.selectedChapterId = chapterId;
  const modal = document.getElementById('chapter-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  state.activeChapterModal = true;
  renderChapterModalContent();
}

function closeChapterModal() {
  const modal = document.getElementById('chapter-modal');
  if (modal) modal.classList.add('hidden');
  state.activeChapterModal = false;
}

function selectModalChapter(chapterId) {
  state.selectedChapterId = chapterId;
  renderChapterModalContent();
}

function renderChapterModalContent() {
  const ch = state.chapters.find(c => c.id === state.selectedChapterId) || state.chapters[0];
  
  // Update header
  const titleEl = document.getElementById('modal-chapter-title');
  if (titleEl) titleEl.textContent = `Chapter ${ch.number}: ${ch.title}`;

  const countEl = document.getElementById('modal-chapter-count');
  if (countEl) countEl.textContent = `${ch.completedLessons} of ${ch.lessonsCount} Lessons Complete`;

  // Render left chapter list
  const listEl = document.getElementById('modal-chapters-sidebar');
  if (listEl) {
    listEl.innerHTML = state.chapters.map(c => {
      const isSelected = c.id === state.selectedChapterId;
      const isCompleted = c.status === 'completed';
      const isLocked = c.status === 'locked';

      let iconHtml = '';
      if (isCompleted) {
        iconHtml = `<div class="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
          <svg class="w-4 h-4 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
        </div>`;
      } else if (!isLocked) {
        iconHtml = `<div class="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
          <svg class="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </div>`;
      } else {
        iconHtml = `<div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center flex-shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>`;
      }

      const activeClasses = isSelected
        ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/60 shadow-sm'
        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border-transparent';

      const textOpacity = isLocked ? 'text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200';

      return `
        <button onclick="selectModalChapter(${c.id})" class="w-full text-left p-3.5 rounded-2xl flex items-center gap-3.5 border transition-all ${activeClasses}">
          ${iconHtml}
          <div>
            <div class="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">CHAPTER ${c.number}</div>
            <div class="text-sm font-semibold ${textOpacity} truncate">${c.title}</div>
          </div>
        </button>
      `;
    }).join('');
  }

  // Render right lesson list
  const lessonsContainer = document.getElementById('modal-lessons-list');
  if (lessonsContainer) {
    lessonsContainer.innerHTML = ch.lessons.map(lesson => {
      const typeBg = lesson.type === 'VIDEO' 
        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' 
        : lesson.type === 'LAB' 
        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' 
        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300';

      return `
        <div class="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              ${lesson.completed 
                ? `<svg class="w-5 h-5 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>`
                : `<svg class="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`
              }
            </div>
            <div>
              <h4 class="font-bold text-slate-900 dark:text-white text-base">${lesson.title}</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">${lesson.desc}</p>
              <div class="flex items-center gap-3 mt-2">
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-md ${typeBg}">${lesson.type}</span>
                <span class="text-xs text-slate-400 flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  ${lesson.duration}
                </span>
              </div>
            </div>
          </div>
          <button onclick="launchLesson('${lesson.type}', '${lesson.title}')" class="px-5 py-2 rounded-xl border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:text-white text-xs font-bold transition-all whitespace-nowrap self-end sm:self-center">
            ${lesson.completed ? 'Replay' : 'Start'}
          </button>
        </div>
      `;
    }).join('');
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

function launchLesson(type, title) {
  closeChapterModal();
  if (type === 'VIDEO' || type === 'LAB' || type === 'QUIZ') {
    navigateTo('video');
    showToast('Lesson Loaded', `Now playing: ${title}`, 'success');
  }
}

// AI Tutor Chat System
let aiSearchQuery = '';

function selectChatSession(sessionId) {
  state.aiTutor.currentSessionId = sessionId;
  renderChatSessions();
  renderChatMessages();
}

function filterChatSessions(query) {
  aiSearchQuery = (query || '').toLowerCase().trim();
  renderChatSessions();
}

function renderChatSessions() {
  const container = document.getElementById('ai-sessions-list');
  if (!container) return;

  const filteredSessions = state.aiTutor.sessions.filter(s => {
    if (!aiSearchQuery) return true;
    return s.title.toLowerCase().includes(aiSearchQuery) || 
      s.messages.some(m => m.text.toLowerCase().includes(aiSearchQuery));
  });

  if (filteredSessions.length === 0) {
    container.innerHTML = `
      <div class="p-3 text-center text-xs text-slate-400">
        ${aiSearchQuery ? 'No matching conversations' : 'No active chats. Click New Session!'}
      </div>
    `;
    return;
  }

  container.innerHTML = filteredSessions.map(s => {
    const isActive = s.id === state.aiTutor.currentSessionId;
    const activeClasses = isActive
      ? 'bg-purple-600 text-white font-semibold shadow-sm'
      : 'text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800';

    return `
      <div class="group relative flex items-center justify-between rounded-xl ${activeClasses} transition-all">
        <button onclick="selectChatSession(${s.id})" class="flex-1 text-left px-3 py-2.5 text-xs flex items-center gap-2 truncate">
          <svg class="w-3.5 h-3.5 flex-shrink-0 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
          <span class="truncate">${s.title}</span>
        </button>
        <button onclick="deleteChatSession(${s.id}, event)" title="Delete conversation" class="p-1.5 mr-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-black/20 text-current transition-all">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </div>
    `;
  }).join('');
}

function deleteChatSession(sessionId, event) {
  if (event) event.stopPropagation();

  state.aiTutor.sessions = state.aiTutor.sessions.filter(s => s.id !== sessionId);

  // If deleted the current session, select another or create a fresh one
  if (state.aiTutor.currentSessionId === sessionId) {
    if (state.aiTutor.sessions.length > 0) {
      state.aiTutor.currentSessionId = state.aiTutor.sessions[0].id;
    } else {
      const newId = Date.now();
      state.aiTutor.sessions.push({
        id: newId,
        title: "New AI Exploration",
        messages: [
          {
            sender: "owl",
            name: "Professor Owl",
            text: "Hello Divya! I'm your AI Guru. Ask me anything about Artificial Intelligence, Python, Math, or your current homework!"
          }
        ]
      });
      state.aiTutor.currentSessionId = newId;
    }
  }

  renderChatSessions();
  renderChatMessages();
  showToast('Conversation Deleted', 'Chat session was successfully removed', 'info');
}

function clearCurrentChat() {
  const currentSession = state.aiTutor.sessions.find(s => s.id === state.aiTutor.currentSessionId);
  if (!currentSession) return;

  currentSession.messages = [
    {
      sender: "owl",
      name: "Professor Owl",
      text: "Conversation cleared! What would you like to explore next?"
    }
  ];
  renderChatMessages();
  showToast('Chat Cleared', 'Messages in this conversation were reset', 'info');
}

function clearAllChatSessions() {
  state.aiTutor.sessions = [
    {
      id: Date.now(),
      title: "New AI Exploration",
      messages: [
        {
          sender: "owl",
          name: "Professor Owl",
          text: "All chat history cleared! Ask me anything to start a new exploration."
        }
      ]
    }
  ];
  state.aiTutor.currentSessionId = state.aiTutor.sessions[0].id;
  renderChatSessions();
  renderChatMessages();
  showToast('All Chats Cleared', 'Chat history has been completely reset', 'info');
}

function deleteChatMessage(index) {
  const currentSession = state.aiTutor.sessions.find(s => s.id === state.aiTutor.currentSessionId);
  if (!currentSession || !currentSession.messages[index]) return;

  currentSession.messages.splice(index, 1);
  if (currentSession.messages.length === 0) {
    currentSession.messages.push({
      sender: "owl",
      name: "Professor Owl",
      text: "What would you like to explore next?"
    });
  }
  renderChatMessages();
  showToast('Message Deleted', 'Message removed from conversation.', 'info');
}

function renderChatMessages() {
  const container = document.getElementById('ai-messages-stream');
  if (!container) return;

  const currentSession = state.aiTutor.sessions.find(s => s.id === state.aiTutor.currentSessionId) || state.aiTutor.sessions[0];
  if (!currentSession) return;

  container.innerHTML = currentSession.messages.map((m, index) => {
    if (m.sender === 'owl') {
      return `
        <div class="group relative flex items-start gap-3.5 max-w-2xl">
          <div class="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/60 flex-shrink-0 overflow-hidden shadow-sm flex items-center justify-center text-xl">
            🦉
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-bold text-slate-500 dark:text-slate-400">Professor Owl</span>
              <button onclick="deleteChatMessage(${index})" title="Delete message" class="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-opacity p-0.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
            <div class="bg-purple-50 dark:bg-purple-950/50 border border-purple-100 dark:border-purple-900/60 rounded-3xl rounded-tl-sm px-5 py-3.5 text-sm text-slate-800 dark:text-slate-200 leading-relaxed shadow-sm">
              ${m.text}
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="group relative flex flex-col items-end max-w-2xl ml-auto">
          <div class="flex items-center gap-2 mb-1">
            <button onclick="deleteChatMessage(${index})" title="Delete message" class="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-opacity p-0.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400">${state.user.name}</span>
          </div>
          <div class="bg-purple-600 text-white rounded-3xl rounded-tr-sm px-5 py-3.5 text-sm leading-relaxed shadow-md shadow-purple-600/20">
            ${m.text}
          </div>
        </div>
      `;
    }
  }).join('');

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

function sendAiMessage(promptText = null) {
  const inputEl = document.getElementById('ai-tutor-input');
  const text = promptText || (inputEl ? inputEl.value.trim() : '');
  if (!text || state.aiTutor.isTyping) return;

  if (inputEl) inputEl.value = '';

  const currentSession = state.aiTutor.sessions.find(s => s.id === state.aiTutor.currentSessionId);
  if (!currentSession) return;

  // Add user message
  currentSession.messages.push({
    sender: 'user',
    name: state.user.name,
    text: text
  });

  renderChatMessages();

  // Show typing indicator
  state.aiTutor.isTyping = true;
  const container = document.getElementById('ai-messages-stream');
  
  const typingBubble = document.createElement('div');
  typingBubble.id = 'ai-typing-indicator';
  typingBubble.className = 'flex items-start gap-3.5 max-w-2xl';
  typingBubble.innerHTML = `
    <div class="w-10 h-10 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center text-xl">🦉</div>
    <div class="bg-purple-50 dark:bg-purple-950/50 border border-purple-100 dark:border-purple-900/60 rounded-3xl rounded-tl-sm px-5 py-3.5 text-sm flex items-center gap-1.5 shadow-sm">
      <span class="w-2 h-2 rounded-full bg-purple-600 typing-dot"></span>
      <span class="w-2 h-2 rounded-full bg-purple-600 typing-dot"></span>
      <span class="w-2 h-2 rounded-full bg-purple-600 typing-dot"></span>
    </div>
  `;
  container.appendChild(typingBubble);
  container.scrollTop = container.scrollHeight;

  // Generate intelligent response
  setTimeout(() => {
    typingBubble.remove();
    state.aiTutor.isTyping = false;

    let reply = "Great question! When neural networks learn representations, they extract low-level features (edges, textures) in early layers, and compose them into high-level concepts (eyes, faces, whole objects) in deeper layers.";
    const lower = text.toLowerCase();

    if (lower.includes("hint")) {
      reply = "💡 Hint: Think about how convolutional filters slide across pixels to calculate feature maps. Each filter specializes in detecting a specific pattern!";
    } else if (lower.includes("simpler") || lower.includes("explain")) {
      reply = "Imagine looking through a microscope: first you see tiny dots, then lines connecting dots, then shapes, and finally the whole puzzle comes together. Neural networks work layer by layer just like that!";
    } else if (lower.includes("example")) {
      reply = "For instance, if an AI is identifying a cat: Layer 1 detects diagonal whiskers; Layer 2 recognizes triangular ears; Layer 3 combines them into a feline face score!";
    } else if (lower.includes("token")) {
      reply = "Tokens are the fundamental building blocks of LLMs! A token can be a single letter, a subword (like 'un' + 'breakable'), or an entire common word.";
    }

    currentSession.messages.push({
      sender: 'owl',
      name: 'Professor Owl',
      text: reply
    });

    renderChatMessages();
    
    // Give student +10 XP for asking AI tutor
    addXP(10, 'Asked Professor Owl');
  }, 1200);
}

function createNewSession() {
  const newId = Date.now();
  state.aiTutor.sessions.unshift({
    id: newId,
    title: "New AI Exploration",
    messages: [
      {
        sender: "owl",
        name: "Professor Owl",
        text: "Hello Divya! I'm your AI Guru. Ask me anything about Artificial Intelligence, Python, Math, or your current homework!"
      }
    ]
  });
  selectChatSession(newId);
  showToast('New Session', 'Started a fresh AI Tutor conversation', 'info');
}

// Reward Shop & Progress Actions
function addXP(amount, reason = 'Completed Activity') {
  state.user.xp += amount;
  renderGlobalCounters();
  showToast(`+${amount} XP Earned!`, reason, 'star');
}

function redeemReward(rewardType, cost) {
  if (state.user.xp < cost) {
    showToast('Insufficient XP', `You need ${cost} XP to redeem this reward. Current balance: ${state.user.xp} XP`, 'info');
    return;
  }

  state.user.xp -= cost;
  state.user.redeemedItems.push(rewardType);
  renderGlobalCounters();

  if (rewardType === 'dark-theme') {
    state.user.darkThemeUnlocked = true;
    showToast('Reward Unlocked!', 'Dark Theme is now available in your Settings!', 'star');
    const btn = document.getElementById('redeem-dark-theme-btn');
    if (btn) {
      btn.textContent = 'Unlocked';
      btn.disabled = true;
      btn.className = 'px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-500 font-bold text-xs cursor-not-allowed';
    }
  } else if (rewardType === 'ai-hour') {
    state.user.aiHoursUnlocked += 1;
    showToast('Reward Unlocked!', '+1 Hour of 1-on-1 AI Tutoring credited to your account!', 'star');
  }

  // Update progress page shop cards
  const balanceEl = document.getElementById('shop-balance-display');
  if (balanceEl) balanceEl.textContent = `Balance: ${state.user.xp.toLocaleString()} XP`;
}

// Theme Switcher & Preferences
function setTheme(theme) {
  state.currentTheme = theme;
  const root = document.documentElement;

  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else if (theme === 'light') {
    root.removeAttribute('data-theme');
  } else {
    // System
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }

  // Update Settings cards visual indicator
  ['light', 'dark', 'system'].forEach(t => {
    const card = document.getElementById(`theme-card-${t}`);
    const check = document.getElementById(`theme-check-${t}`);
    if (card && check) {
      if (t === theme) {
        card.classList.add('border-purple-600', 'ring-2', 'ring-purple-600/20');
        card.classList.remove('border-slate-200', 'dark:border-slate-700');
        check.classList.remove('hidden');
      } else {
        card.classList.remove('border-purple-600', 'ring-2', 'ring-purple-600/20');
        card.classList.add('border-slate-200', 'dark:border-slate-700');
        check.classList.add('hidden');
      }
    }
  });

  showToast('Theme Updated', `Switched to ${theme.toUpperCase()} mode`, 'info');
}

// Video Player Controller
function toggleVideoPlay() {
  state.video.isPlaying = !state.video.isPlaying;
  const playBtnIcon = document.getElementById('video-center-play-btn');
  const bottomPlayBtn = document.getElementById('video-bottom-play-btn');
  
  if (playBtnIcon) {
    playBtnIcon.innerHTML = state.video.isPlaying
      ? `<svg class="w-8 h-8 fill-white" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`
      : `<svg class="w-8 h-8 fill-white ml-1" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
  }

  if (bottomPlayBtn) {
    bottomPlayBtn.innerHTML = state.video.isPlaying
      ? `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`
      : `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
  }

  showToast(state.video.isPlaying ? 'Playing Lesson' : 'Paused', 'Neural Foundations: Neural Basics', 'info');
}

function switchVideoTab(tabName) {
  state.video.activeTab = tabName;
  ['overview', 'notes', 'discussion'].forEach(t => {
    const tabBtn = document.getElementById(`video-tab-btn-${t}`);
    const tabPane = document.getElementById(`video-tab-pane-${t}`);
    if (tabBtn && tabPane) {
      if (t === tabName) {
        tabBtn.className = "pb-3 font-bold text-sm text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400";
        tabPane.classList.remove('hidden');
      } else {
        tabBtn.className = "pb-3 font-medium text-sm text-slate-500 dark:text-slate-400 hover:text-purple-600 border-b-2 border-transparent";
        tabPane.classList.add('hidden');
      }
    }
  });
}

function saveVideoNote() {
  const textarea = document.getElementById('video-notes-input');
  if (textarea) {
    state.video.notes = textarea.value;
    showToast('Note Saved', 'Your study notes have been synced to your profile!', 'success');
  }
}

function postDiscussionReply() {
  const input = document.getElementById('discussion-input');
  if (!input || !input.value.trim()) return;

  state.video.discussion.unshift({
    author: state.user.name,
    time: "Just now",
    text: input.value.trim()
  });

  input.value = '';
  renderDiscussionList();
  showToast('Comment Posted', 'Your reply is visible to the study group', 'success');
  addXP(5, 'Participated in Discussion');
}

function renderDiscussionList() {
  const container = document.getElementById('discussion-thread-container');
  if (!container) return;

  container.innerHTML = state.video.discussion.map(d => `
    <div class="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/60 flex items-start gap-3">
      <div class="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
        ${d.author.charAt(0)}
      </div>
      <div>
        <div class="flex items-center gap-2">
          <span class="font-bold text-xs text-slate-900 dark:text-white">${d.author}</span>
          <span class="text-[10px] text-slate-400">${d.time}</span>
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">${d.text}</p>
      </div>
    </div>
  `).join('');
}

// Authentication Handlers
function handleLogin(e) {
  if (e) e.preventDefault();
  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-password');
  
  const email = emailInput ? emailInput.value : '';
  state.user.email = email || "divya@futureminds.demo";
  state.user.name = "Divya N";

  showToast('Welcome back, Divya!', 'Successfully signed into FutureMinds', 'success');
  navigateTo('dashboard');
}

function handleLogout() {
  closeAllModals();
  showToast('Logged Out', 'You have been safely signed out.', 'info');
  navigateTo('student-login');
}

// Sidebar Collapse / Expand Controller
function toggleSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const backdrop = document.getElementById('mobile-sidebar-backdrop');
  if (!sidebar) return;

  // On mobile devices (screen width <= 768px)
  if (window.innerWidth <= 768) {
    const isMobileOpen = sidebar.classList.toggle('mobile-open');
    if (backdrop) {
      backdrop.classList.toggle('active', isMobileOpen);
    }
  } else {
    // Desktop collapse
    sidebar.classList.toggle('collapsed');
    const isCollapsed = sidebar.classList.contains('collapsed');
    showToast('Sidebar', isCollapsed ? 'Collapsed to icon-only mode' : 'Expanded navigation', 'info');
  }
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const backdrop = document.getElementById('mobile-sidebar-backdrop');
  if (sidebar) sidebar.classList.remove('mobile-open');
  if (backdrop) backdrop.classList.remove('active');
}

// Horizontal Chapters Scroller
function scrollChapters(offset) {
  const container = document.getElementById('dashboard-chapters-container');
  if (container) {
    container.scrollBy({ left: offset, behavior: 'smooth' });
  }
}

// Horizontal World Map Scroller
function scrollWorldMap(offset) {
  const container = document.getElementById('world-map-lands-container');
  if (container) {
    container.scrollBy({ left: offset, behavior: 'smooth' });
  }
}

// Gamified Bonus Chest opener on Roadmap 2
function openBonusChest(chestId) {
  const chestEl = document.getElementById(`bonus-chest-${chestId}`);
  if (chestEl && !chestEl.dataset.opened) {
    chestEl.dataset.opened = "true";
    chestEl.innerHTML = `
      <div class="text-3xl animate-bounce">💎</div>
      <span class="text-[10px] font-black text-amber-500 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full shadow-md mt-1">+100 XP</span>
    `;
    addXP(100, 'Found Hidden Path Crystal!');
  } else {
    showToast('Already Claimed', 'You already unlocked this bonus chest!', 'info');
  }
}

// Event Listeners on Document Ready
document.addEventListener('DOMContentLoaded', () => {
  // Global click listener to close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#profile-dropdown-container') && !e.target.closest('#profile-dropdown')) {
      document.getElementById('profile-dropdown')?.classList.add('hidden');
      state.activeProfileDropdown = false;
    }
    if (!e.target.closest('#notification-container') && !e.target.closest('#notification-dropdown')) {
      document.getElementById('notification-dropdown')?.classList.add('hidden');
      state.activeNotificationDropdown = false;
    }
  });

  // Initial renders
  renderGlobalCounters();
  renderChatSessions();
  renderChatMessages();
  renderDiscussionList();

  // Route to initial view
  navigateTo('student-login');
});
