import { useApp } from '../context/AppContext.jsx';

const ROLES = [
  {
    id: 'student',
    emoji: '🦉',
    title: 'Student',
    desc: 'Check your assignments, attend classes, and track your learning progress.',
    border: 'border-purple-100 dark:border-slate-700/60',
    avatar: 'bg-purple-100 dark:bg-purple-900/30',
    button: 'bg-purple-600 shadow-purple-600/30 hover:bg-purple-700',
  },
  {
    id: 'teacher',
    emoji: '🐢',
    title: 'Teacher',
    desc: 'Manage your curriculum, grade submissions, and interact with your students.',
    border: 'border-emerald-100 dark:border-slate-700/60',
    avatar: 'bg-emerald-100 dark:bg-emerald-900/30',
    button: 'bg-emerald-600 shadow-emerald-600/30 hover:bg-emerald-700',
  },
  {
    id: 'parent',
    emoji: '🐘',
    title: 'Parent',
    desc: "Stay updated with your child's performance, attendance, and school news.",
    border: 'border-blue-100 dark:border-slate-700/60',
    avatar: 'bg-blue-100 dark:bg-blue-900/30',
    button: 'bg-sky-500 shadow-sky-500/30 hover:bg-sky-600',
  },
  {
    id: 'admin',
    emoji: '🧙‍♂️',
    title: 'Admin',
    desc: 'Configure institutional settings, manage user accounts, and view analytics.',
    border: 'border-amber-100 dark:border-slate-700/60',
    avatar: 'bg-amber-100 dark:bg-amber-900/30',
    button: 'bg-amber-600 shadow-amber-600/30 hover:bg-amber-700',
  },
];

export default function RoleSelect() {
  const { navigateTo, showToast } = useApp();

  const handleLogin = (role) => {
    if (role.id === 'student') {
      navigateTo('student-login');
      return;
    }
    showToast(`${role.title} Portal`, `${role.title} demo redirects to student dashboard for evaluation`, 'info');
    navigateTo('dashboard');
  };

  return (
    <main id="view-role-select" className="view-container flex-1 max-w-6xl mx-auto px-4 py-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-600 dark:text-purple-400 font-display tracking-tight mb-3">Welcome Back</h1>
      <p className="text-slate-600 dark:text-slate-400 max-w-xl text-sm sm:text-base mb-12">
        Access your personalized learning journey. Select your account type below to continue to your dashboard.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {ROLES.map((role) => (
          <div
            key={role.id}
            className={`bg-white dark:bg-slate-800 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border ${role.border} flex flex-col items-center text-center relative group`}
          >
            <div className={`w-24 h-24 rounded-full ${role.avatar} flex items-center justify-center text-5xl mb-5 shadow-inner group-hover:scale-105 transition-transform`}>
              {role.emoji}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{role.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 flex-1">{role.desc}</p>
            <button
              type="button"
              onClick={() => handleLogin(role)}
              className={`w-full py-3 rounded-2xl ${role.button} text-white font-bold text-sm shadow-md transition-all`}
            >
              Login
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 text-xs text-slate-500 dark:text-slate-400">
        Having trouble signing in?{' '}
        <button
          type="button"
          onClick={() => showToast('Helpdesk', 'Please contact support@futureminds.ai', 'info')}
          className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
        >
          Contact Support
        </button>
      </div>
    </main>
  );
}
