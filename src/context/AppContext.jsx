import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  INITIAL_AI_TUTOR,
  INITIAL_CHAPTERS,
  INITIAL_USER,
  INITIAL_VIDEO,
  generateOwlReply,
} from '../data/initialState';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(INITIAL_USER);
  const [currentView, setCurrentView] = useState('student-login');
  const [currentTheme, setCurrentTheme] = useState('light');
  const [chapters] = useState(INITIAL_CHAPTERS);
  const [video, setVideo] = useState(INITIAL_VIDEO);
  const [aiTutor, setAiTutor] = useState(INITIAL_AI_TUTOR);
  const [toasts, setToasts] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [chapterModalOpen, setChapterModalOpen] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState(1);
  const [aiSearchQuery, setAiSearchQuery] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [discussionInput, setDiscussionInput] = useState('');
  const toastSeq = useRef(0);
  const typingRef = useRef(false);

  const showToast = useCallback((title, message, icon = 'info') => {
    const id = ++toastSeq.current;
    setToasts((prev) => [...prev, { id, title, message, icon }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  }, []);

  const closeDropdowns = useCallback(() => {
    setProfileOpen(false);
    setNotifOpen(false);
  }, []);

  const closeAllModals = useCallback(() => {
    closeDropdowns();
    setChapterModalOpen(false);
  }, [closeDropdowns]);

  const navigateTo = useCallback((viewName) => {
    setCurrentView(viewName);
    closeAllModals();
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [closeAllModals]);

  const applyTheme = useCallback((theme) => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
      root.removeAttribute('data-theme');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) root.setAttribute('data-theme', 'dark');
      else root.removeAttribute('data-theme');
    }
  }, []);

  useEffect(() => {
    applyTheme(currentTheme);
    if (currentTheme !== 'system') return undefined;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyTheme('system');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [currentTheme, applyTheme]);

  const setTheme = useCallback((theme) => {
    setCurrentTheme(theme);
    showToast('Theme Updated', `Switched to ${theme.toUpperCase()} mode`, 'info');
  }, [showToast]);

  const toggleTheme = useCallback(() => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }, [currentTheme, setTheme]);

  const handleLogin = useCallback((event, email) => {
    if (event) event.preventDefault();
    setUser((prev) => ({
      ...prev,
      email: email || 'divya@futureminds.demo',
      name: 'Divya N',
    }));
    showToast('Welcome back, Divya!', 'Successfully signed into FutureMinds', 'success');
    navigateTo('dashboard');
  }, [navigateTo, showToast]);

  const handleLogout = useCallback(() => {
    closeAllModals();
    showToast('Logged Out', 'You have been safely signed out.', 'info');
    navigateTo('student-login');
  }, [closeAllModals, navigateTo, showToast]);

  const toggleSidebar = useCallback(() => {
    if (window.innerWidth <= 768) {
      setMobileSidebarOpen((open) => !open);
      return;
    }
    setSidebarCollapsed((collapsed) => {
      const next = !collapsed;
      showToast('Sidebar', next ? 'Collapsed to icon-only mode' : 'Expanded navigation', 'info');
      return next;
    });
  }, [showToast]);

  const closeMobileSidebar = useCallback(() => {
    setMobileSidebarOpen(false);
  }, []);

  const toggleProfileDropdown = useCallback((event) => {
    if (event) event.stopPropagation();
    setProfileOpen((open) => {
      const next = !open;
      if (next) setNotifOpen(false);
      return next;
    });
  }, []);

  const toggleNotificationDropdown = useCallback((event) => {
    if (event) event.stopPropagation();
    setNotifOpen((open) => {
      const next = !open;
      if (next) setProfileOpen(false);
      return next;
    });
  }, []);

  const openChapterModal = useCallback((chapterId = 1) => {
    setSelectedChapterId(chapterId);
    setChapterModalOpen(true);
  }, []);

  const closeChapterModal = useCallback(() => {
    setChapterModalOpen(false);
  }, []);

  const selectModalChapter = useCallback((chapterId) => {
    setSelectedChapterId(chapterId);
  }, []);

  const launchLesson = useCallback((type, title) => {
    closeChapterModal();
    if (type === 'VIDEO' || type === 'LAB' || type === 'QUIZ') {
      navigateTo('video');
      showToast('Lesson Loaded', `Now playing: ${title}`, 'success');
    }
  }, [closeChapterModal, navigateTo, showToast]);

  const addXP = useCallback((amount, reason = 'Completed Activity') => {
    setUser((prev) => ({ ...prev, xp: prev.xp + amount }));
    showToast(`+${amount} XP Earned!`, reason, 'star');
  }, [showToast]);

  const redeemReward = useCallback((rewardType, cost) => {
    setUser((prev) => {
      if (prev.xp < cost) {
        showToast('Insufficient XP', `You need ${cost} XP to redeem this reward. Current balance: ${prev.xp} XP`, 'info');
        return prev;
      }
      const next = {
        ...prev,
        xp: prev.xp - cost,
        redeemedItems: [...prev.redeemedItems, rewardType],
      };
      if (rewardType === 'dark-theme') {
        next.darkThemeUnlocked = true;
        showToast('Reward Unlocked!', 'Dark Theme is now available in your Settings!', 'star');
      } else if (rewardType === 'ai-hour') {
        next.aiHoursUnlocked += 1;
        showToast('Reward Unlocked!', '+1 Hour of 1-on-1 AI Tutoring credited to your account!', 'star');
      }
      return next;
    });
  }, [showToast]);

  const toggleVideoPlay = useCallback(() => {
    setVideo((prev) => {
      const isPlaying = !prev.isPlaying;
      showToast(isPlaying ? 'Playing Lesson' : 'Paused', 'Neural Foundations: Neural Basics', 'info');
      return { ...prev, isPlaying };
    });
  }, [showToast]);

  const switchVideoTab = useCallback((tabName) => {
    setVideo((prev) => ({ ...prev, activeTab: tabName }));
  }, []);

  const saveVideoNote = useCallback((notes) => {
    setVideo((prev) => ({ ...prev, notes }));
    showToast('Note Saved', 'Your study notes have been synced to your profile!', 'success');
  }, [showToast]);

  const postDiscussionReply = useCallback(() => {
    const text = discussionInput.trim();
    if (!text) return;
    setVideo((prev) => ({
      ...prev,
      discussion: [{ author: user.name, time: 'Just now', text }, ...prev.discussion],
    }));
    setDiscussionInput('');
    showToast('Comment Posted', 'Your reply is visible to the study group', 'success');
    addXP(5, 'Participated in Discussion');
  }, [addXP, discussionInput, showToast, user.name]);

  const selectChatSession = useCallback((sessionId) => {
    setAiTutor((prev) => ({ ...prev, currentSessionId: sessionId }));
  }, []);

  const createNewSession = useCallback(() => {
    const newId = Date.now();
    setAiTutor((prev) => ({
      ...prev,
      currentSessionId: newId,
      sessions: [
        {
          id: newId,
          title: 'New AI Exploration',
          messages: [
            {
              sender: 'owl',
              name: 'Professor Owl',
              text: "Hello Divya! I'm your AI Guru. Ask me anything about Artificial Intelligence, Python, Math, or your current homework!",
            },
          ],
        },
        ...prev.sessions,
      ],
    }));
    showToast('New Session', 'Started a fresh AI Tutor conversation', 'info');
  }, [showToast]);

  const deleteChatSession = useCallback((sessionId, event) => {
    if (event) event.stopPropagation();
    setAiTutor((prev) => {
      let sessions = prev.sessions.filter((session) => session.id !== sessionId);
      let currentSessionId = prev.currentSessionId;
      if (currentSessionId === sessionId) {
        if (sessions.length > 0) {
          currentSessionId = sessions[0].id;
        } else {
          const newId = Date.now();
          sessions = [
            {
              id: newId,
              title: 'New AI Exploration',
              messages: [
                {
                  sender: 'owl',
                  name: 'Professor Owl',
                  text: "Hello Divya! I'm your AI Guru. Ask me anything about Artificial Intelligence, Python, Math, or your current homework!",
                },
              ],
            },
          ];
          currentSessionId = newId;
        }
      }
      return { ...prev, sessions, currentSessionId };
    });
    showToast('Conversation Deleted', 'Chat session was successfully removed', 'info');
  }, [showToast]);

  const clearCurrentChat = useCallback(() => {
    setAiTutor((prev) => ({
      ...prev,
      sessions: prev.sessions.map((session) =>
        session.id === prev.currentSessionId
          ? {
              ...session,
              messages: [
                { sender: 'owl', name: 'Professor Owl', text: 'Conversation cleared! What would you like to explore next?' },
              ],
            }
          : session
      ),
    }));
    showToast('Chat Cleared', 'Messages in this conversation were reset', 'info');
  }, [showToast]);

  const clearAllChatSessions = useCallback(() => {
    const newId = Date.now();
    setAiTutor({
      currentSessionId: newId,
      isTyping: false,
      sessions: [
        {
          id: newId,
          title: 'New AI Exploration',
          messages: [
            { sender: 'owl', name: 'Professor Owl', text: 'All chat history cleared! Ask me anything to start a new exploration.' },
          ],
        },
      ],
    });
    showToast('All Chats Cleared', 'Chat history has been completely reset', 'info');
  }, [showToast]);

  const deleteChatMessage = useCallback((index) => {
    setAiTutor((prev) => ({
      ...prev,
      sessions: prev.sessions.map((session) => {
        if (session.id !== prev.currentSessionId) return session;
        const messages = session.messages.filter((_, i) => i !== index);
        if (messages.length === 0) {
          messages.push({ sender: 'owl', name: 'Professor Owl', text: 'What would you like to explore next?' });
        }
        return { ...session, messages };
      }),
    }));
    showToast('Message Deleted', 'Message removed from conversation.', 'info');
  }, [showToast]);

  const sendAiMessage = useCallback((promptText = null) => {
    const text = (promptText ?? aiInput).trim();
    if (!text || typingRef.current) return;
    setAiInput('');
    typingRef.current = true;

    setAiTutor((prev) => ({
      ...prev,
      isTyping: true,
      sessions: prev.sessions.map((session) =>
        session.id === prev.currentSessionId
          ? { ...session, messages: [...session.messages, { sender: 'user', name: user.name, text }] }
          : session
      ),
    }));

    window.setTimeout(() => {
      const reply = generateOwlReply(text);
      setAiTutor((prev) => ({
        ...prev,
        isTyping: false,
        sessions: prev.sessions.map((session) =>
          session.id === prev.currentSessionId
            ? { ...session, messages: [...session.messages, { sender: 'owl', name: 'Professor Owl', text: reply }] }
            : session
        ),
      }));
      typingRef.current = false;
      addXP(10, 'Asked Professor Owl');
    }, 1200);
  }, [addXP, aiInput, user.name]);

  const navKey = useMemo(() => {
    if (currentView === 'roadmap-1' || currentView === 'roadmap-2' || currentView === 'video') {
      return 'roadmap';
    }
    return currentView;
  }, [currentView]);

  const selectedChapter = useMemo(
    () => chapters.find((chapter) => chapter.id === selectedChapterId) || chapters[0],
    [chapters, selectedChapterId]
  );

  const currentSession = useMemo(
    () => aiTutor.sessions.find((session) => session.id === aiTutor.currentSessionId) || aiTutor.sessions[0],
    [aiTutor]
  );

  const filteredSessions = useMemo(() => {
    const query = aiSearchQuery.toLowerCase().trim();
    if (!query) return aiTutor.sessions;
    return aiTutor.sessions.filter(
      (session) =>
        session.title.toLowerCase().includes(query) ||
        session.messages.some((message) => message.text.toLowerCase().includes(query))
    );
  }, [aiSearchQuery, aiTutor.sessions]);

  const value = useMemo(
    () => ({
      user,
      currentView,
      currentTheme,
      chapters,
      video,
      aiTutor,
      toasts,
      sidebarCollapsed,
      mobileSidebarOpen,
      profileOpen,
      notifOpen,
      chapterModalOpen,
      selectedChapterId,
      selectedChapter,
      aiSearchQuery,
      setAiSearchQuery,
      aiInput,
      setAiInput,
      discussionInput,
      setDiscussionInput,
      navKey,
      currentSession,
      filteredSessions,
      navigateTo,
      showToast,
      setTheme,
      toggleTheme,
      handleLogin,
      handleLogout,
      toggleSidebar,
      closeMobileSidebar,
      toggleProfileDropdown,
      toggleNotificationDropdown,
      closeDropdowns,
      closeAllModals,
      openChapterModal,
      closeChapterModal,
      selectModalChapter,
      launchLesson,
      addXP,
      redeemReward,
      toggleVideoPlay,
      switchVideoTab,
      saveVideoNote,
      setVideo,
      postDiscussionReply,
      selectChatSession,
      createNewSession,
      deleteChatSession,
      clearCurrentChat,
      clearAllChatSessions,
      deleteChatMessage,
      sendAiMessage,
    }),
    [
      user,
      currentView,
      currentTheme,
      chapters,
      video,
      aiTutor,
      toasts,
      sidebarCollapsed,
      mobileSidebarOpen,
      profileOpen,
      notifOpen,
      chapterModalOpen,
      selectedChapterId,
      selectedChapter,
      aiSearchQuery,
      aiInput,
      discussionInput,
      navKey,
      currentSession,
      filteredSessions,
      navigateTo,
      showToast,
      setTheme,
      toggleTheme,
      handleLogin,
      handleLogout,
      toggleSidebar,
      closeMobileSidebar,
      toggleProfileDropdown,
      toggleNotificationDropdown,
      closeDropdowns,
      closeAllModals,
      openChapterModal,
      closeChapterModal,
      selectModalChapter,
      launchLesson,
      addXP,
      redeemReward,
      toggleVideoPlay,
      switchVideoTab,
      saveVideoNote,
      postDiscussionReply,
      selectChatSession,
      createNewSession,
      deleteChatSession,
      clearCurrentChat,
      clearAllChatSessions,
      deleteChatMessage,
      sendAiMessage,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
