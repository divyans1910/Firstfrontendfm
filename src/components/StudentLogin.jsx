import { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, User } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function StudentLogin() {
  const { handleLogin, navigateTo, showToast } = useApp();
  const [email, setEmail] = useState('divya@futureminds.demo');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <main id="view-student-login" className="view-container flex-1 max-w-md w-full mx-auto px-4 py-8 flex flex-col items-center justify-center">
      <div className="w-full bg-white dark:bg-slate-800/95 rounded-3xl p-8 sm:p-10 shadow-xl border border-purple-100/80 dark:border-slate-700/80 relative backdrop-blur-md">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 p-1 mx-auto -mt-16 shadow-lg shadow-purple-600/30 mb-4 flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-4xl">🦉</div>
        </div>

        <div className="text-center mb-7">
          <h2 className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 font-display">Welcome Back, Student!</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sign in to continue your learning journey.</p>
        </div>

        <form onSubmit={(event) => handleLogin(event, email)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">Email / Student ID</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                id="login-email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 text-slate-800 dark:text-white transition-all"
                placeholder="Enter your email or ID"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="login-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 text-slate-800 dark:text-white transition-all"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-slate-300"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => showToast('Password Reset', 'Password reset instructions sent to your demo email', 'info')}
              className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="w-full py-3.5 mt-2 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-600/35 transition-all flex items-center justify-center gap-2 group">
            <span>Login</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700/60 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => showToast('Registration', 'Demo accounts are pre-registered.', 'info')}
              className="text-purple-600 dark:text-purple-400 font-bold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigateTo('role-select')}
        className="mt-6 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to role selection</span>
      </button>
    </main>
  );
}
