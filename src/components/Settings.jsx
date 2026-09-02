import { useState } from 'react';
import { Bell, Camera, Edit3, Eye, LogOut, Target, User } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const THEME_OPTIONS = [
  { id: 'light', title: 'Light Mode', desc: 'Bright and crisp', preview: '☀️', previewClass: 'bg-purple-100 border border-purple-300' },
  { id: 'dark', title: 'Dark Mode', desc: 'Comfortable for night study', preview: '🌙', previewClass: 'bg-slate-900 border border-slate-700' },
  { id: 'system', title: 'System Default', desc: 'Sync with device settings', preview: '💻', previewClass: 'bg-gradient-to-r from-purple-100 to-slate-900 border border-slate-400' },
];

export default function Settings() {
  const { user, updateProfile, currentTheme, setTheme, handleLogout, showToast } = useApp();
  
  const [profile, setProfile] = useState({
    name: user.name || 'Aanya Sharma',
    email: user.email || 'aanya@futureminds.demo',
    phone: user.phone || '+91 98765 43210',
    school: user.school || 'Delhi Public School, Noida',
    grade: user.grade || 'Grade 8 — Section A',
    board: user.board || 'CBSE',
    goal: user.goal || 'Master fractions & Python',
    role: user.role || 'Student',
  });

  const [prefs, setPrefs] = useState({
    emailDigest: true,
    streakReminders: true,
    teacherUpdates: true,
    achievementAlerts: true,
  });

  const updateField = (key, value) => setProfile((prev) => ({ ...prev, [key]: value }));

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profile);
  };

  return (
    <main id="view-settings" className="view-container p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 flex items-center justify-center text-3xl font-bold shadow-inner overflow-hidden">👩‍🎓</div>
            <button type="button" onClick={() => showToast('Profile Photo', 'Photo upload modal opened', 'info')} className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display">{profile.name}</h2>
              <span className="px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Student • FutureMinds AI Labs</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            type="button" 
            onClick={handleSaveProfile} 
            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-lg shadow-purple-600/20 transition-all hover:scale-105 active:scale-100 flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
          <button type="button" onClick={handleLogout} className="flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl border-2 border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 font-extrabold text-xs transition-all flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer">
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Personal Information Column */}
        <form onSubmit={handleSaveProfile} className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-700/80 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700/60">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">Personal Information</h3>
                <p className="text-[11px] font-medium text-slate-400">Update your account details</p>
              </div>
            </div>
            <button type="submit" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer">
              Save Profile
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {[
              ['name', 'Full Name'],
              ['email', 'Email Address', 'email'],
              ['phone', 'Phone'],
              ['school', 'School'],
              ['grade', 'Grade/Class'],
              ['board', 'Academic Board'],
            ].map(([key, label, type = 'text']) => (
              <div key={key} className="space-y-1.5">
                <label className="block font-extrabold text-slate-400 uppercase tracking-widest text-[10px]">{label}</label>
                <input
                  type={type}
                  value={profile[key]}
                  onChange={(event) => updateField(key, event.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700/70 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            ))}

            <div className="sm:col-span-2 space-y-1.5">
              <label className="block font-extrabold text-slate-400 uppercase tracking-widest text-[10px]">Learning Goal</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-purple-600">
                  <Target className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={profile.goal}
                  onChange={(event) => updateField('goal', event.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-purple-50/50 dark:bg-slate-700/40 border border-purple-200/80 dark:border-purple-900/60 text-purple-900 dark:text-purple-200 font-bold focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-extrabold text-slate-400 uppercase tracking-widest text-[10px]">Password</label>
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700/70">
                <span className="font-mono text-slate-600 dark:text-slate-300 font-bold">••••••••</span>
                <button type="button" onClick={() => showToast('Password', 'Change password flow triggered', 'info')} className="text-purple-600 dark:text-purple-400 font-bold text-xs hover:underline cursor-pointer">
                  Change Password
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block font-extrabold text-slate-400 uppercase tracking-widest text-[10px]">Portal Role</label>
              <input type="text" value={profile.role} readOnly className="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-700/20 border border-slate-200/80 dark:border-slate-700/60 text-slate-400 font-bold cursor-not-allowed" />
            </div>
          </div>
        </form>

        {/* Sidebar Appearance Column */}
        <div className="space-y-6 w-full">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-700/80 space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-700/60">
              <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">Appearance</h3>
                <p className="text-[11px] font-medium text-slate-400">Choose your visual theme</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {THEME_OPTIONS.map((option) => {
                const selected = currentTheme === option.id;
                return (
                  <div
                    key={option.id}
                    id={`theme-card-${option.id}`}
                    onClick={() => setTheme(option.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      selected
                        ? 'border-purple-600 ring-2 ring-purple-600/20 bg-purple-50/50 dark:bg-slate-700/40'
                        : 'border-slate-200/80 dark:border-slate-700/80 hover:border-purple-400 bg-white dark:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-12 h-8 rounded-xl flex items-center justify-center text-xs shadow-inner ${option.previewClass}`}>{option.preview}</div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white font-display">{option.title}</div>
                        <div className="text-[10px] text-slate-400 font-medium">{option.desc}</div>
                      </div>
                    </div>
                    {selected && (
                      <div id={`theme-check-${option.id}`} className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-black shadow-sm">
                        ✓
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Communication Preferences Section */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-700/80 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-700/60">
          <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">Communication Preferences</h3>
            <p className="text-[11px] font-medium text-slate-400">Manage how we notify you</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ['emailDigest', 'Email Digest', 'Weekly summary of your academic progress'],
            ['streakReminders', 'Streak Reminders', 'Daily nudge at 6:00 PM to maintain your goals'],
            ['teacherUpdates', 'Teacher Updates', 'Instant alerts for feedback and assignments'],
            ['achievementAlerts', 'Achievement Alerts', 'Badges and certificates notifications'],
          ].map(([key, title, desc]) => (
            <div key={key} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700/70 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white font-display">{title}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">{desc}</div>
              </div>
              <input
                type="checkbox"
                checked={prefs[key]}
                onChange={(event) => setPrefs((prev) => ({ ...prev, [key]: event.target.checked }))}
                className="w-5 h-5 rounded-md text-purple-600 focus:ring-purple-500 cursor-pointer accent-purple-600"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}