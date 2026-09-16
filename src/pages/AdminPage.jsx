import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, LogOut, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTENT_REGISTRY, CONTENT_TYPE_OPTIONS, SUGGESTED_MODULES, getTypeEntry } from '../content/registry';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';
import { deleteContentItem, fetchContentItems, fetchRecentContentItems, insertContentItem, uploadContentAsset } from '../lib/contentApi';
import { useApp } from '../context/AppContext.jsx';

function emptyMetadata(type) {
  const meta = {};
  for (const field of getTypeEntry(type).fields) {
    if (field.type === 'array-of-pairs') {
      const [a, b] = field.pairKeys;
      meta[field.name] = [{ [a]: '', [b]: '' }];
    } else {
      meta[field.name] = '';
    }
  }
  return meta;
}

function emptyForm() {
  return {
    title: '',
    module: SUGGESTED_MODULES[0],
    type: 'video',
    tags: '',
    order_index: 0,
    description: '',
    metadata: emptyMetadata('video'),
  };
}

function inputClass() {
  return 'w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-600';
}

function FieldLabel({ children, required }) {
  return (
    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
      {children}
      {required ? <span className="text-rose-500"> *</span> : null}
    </label>
  );
}

export default function AdminPage() {
  const { showToast } = useApp();
  const [session, setSession] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [moduleOptions, setModuleOptions] = useState(SUGGESTED_MODULES);
  const [recent, setRecent] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const typeEntry = useMemo(() => getTypeEntry(form.type), [form.type]);

  const refreshRecent = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    try {
      const [recentRows, allRows] = await Promise.all([fetchRecentContentItems(8), fetchContentItems()]);
      setRecent(recentRows);
      const fromDb = [...new Set(allRows.map((row) => row.module).filter(Boolean))];
      setModuleOptions([...new Set([...SUGGESTED_MODULES, ...fromDb])]);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setAuthChecking(false);
      return undefined;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthChecking(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) refreshRecent();
  }, [session, refreshRecent]);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      showToast('Sign-in failed', error.message, 'info');
      return;
    }
    showToast('Welcome', 'Signed in as admin', 'success');
  };

  const handleLogout = async () => {
    await supabase?.auth.signOut();
    showToast('Signed out', 'Admin session ended', 'info');
  };

  const setType = (type) => {
    setForm((prev) => ({ ...prev, type, metadata: emptyMetadata(type) }));
  };

  const setMeta = (name, value) => {
    setForm((prev) => ({ ...prev, metadata: { ...prev.metadata, [name]: value } }));
  };

  const updatePair = (field, index, key, value) => {
    const rows = [...(form.metadata[field.name] || [])];
    rows[index] = { ...rows[index], [key]: value };
    setMeta(field.name, rows);
  };

  const addPair = (field) => {
    const [a, b] = field.pairKeys;
    setMeta(field.name, [...(form.metadata[field.name] || []), { [a]: '', [b]: '' }]);
  };

  const removePair = (field, index) => {
    const rows = (form.metadata[field.name] || []).filter((_, i) => i !== index);
    setMeta(field.name, rows.length ? rows : [{ [field.pairKeys[0]]: '', [field.pairKeys[1]]: '' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.module.trim()) {
      showToast('Missing fields', 'Title and module are required', 'info');
      return;
    }

    setSubmitting(true);
    try {
      const metadata = {};
      for (const field of typeEntry.fields) {
        let value = form.metadata[field.name];
        if (field.type === 'file' && value instanceof File) {
          value = await uploadContentAsset(value, form.type);
        }
        if (field.type === 'array-of-pairs') {
          const [a, b] = field.pairKeys;
          value = (value || []).filter((row) => (row[a] || '').trim() || (row[b] || '').trim());
        }
        if (field.required && (value === '' || value == null || (Array.isArray(value) && value.length === 0))) {
          throw new Error(`${field.label} is required`);
        }
        metadata[field.name] = value || (field.type === 'array-of-pairs' ? [] : '');
      }

      await insertContentItem({
        type: form.type,
        title: form.title.trim(),
        module: form.module.trim(),
        tags: form.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        order_index: Number(form.order_index) || 0,
        description: form.description.trim() || null,
        metadata,
      });

      showToast('Published', `${form.title} is now in the library`, 'success');
      setForm(emptyForm());
      await refreshRecent();
    } catch (err) {
      showToast('Upload failed', err.message || 'Could not save content', 'info');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete “${item.title}”?`)) return;
    try {
      await deleteContentItem(item.id);
      showToast('Deleted', `${item.title} removed`, 'success');
      await refreshRecent();
    } catch (err) {
      showToast('Delete failed', err.message, 'info');
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-[#F8F9FD] dark:bg-[#0F172A] flex items-center justify-center p-6">
        <div className="max-w-md bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center space-y-3">
          <h1 className="font-display text-2xl font-extrabold text-purple-600">Admin is not connected</h1>
          <p className="text-sm text-slate-500">Copy <code className="font-mono">.env.example</code> to <code className="font-mono">.env</code> and set your Supabase URL and anon key.</p>
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#F8F9FD] dark:bg-[#0F172A] flex items-center justify-center text-sm text-slate-500">
        Checking admin session…
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50/60 via-white to-purple-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/20 flex flex-col items-center justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl border border-purple-100/80 dark:border-slate-700 space-y-4">
          <div className="text-center mb-2">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600">FutureMinds</div>
            <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white mt-1">Admin sign in</h1>
            <p className="text-xs text-slate-500 mt-1">Upload page only. The student dashboard stays public.</p>
          </div>
          <div>
            <FieldLabel required>Email</FieldLabel>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass()} required />
          </div>
          <div>
            <FieldLabel required>Password</FieldLabel>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className={inputClass()} required />
          </div>
          <button type="submit" className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-600/35">
            Sign in
          </button>
          <Link to="/" className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 hover:text-purple-600">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to student app
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FD] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100">
      <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
        <div>
          <div className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600">Content pipeline</div>
          <h1 className="font-display text-lg font-extrabold">Admin upload</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xs font-bold text-purple-600 hover:underline">Student app</Link>
          <button type="button" onClick={handleLogout} className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-rose-200 text-rose-600 text-xs font-bold hover:bg-rose-50">
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 sm:p-8 space-y-8">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-700/80 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <FieldLabel required>Title</FieldLabel>
              <input value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} className={inputClass()} placeholder="e.g. Neural Basics" />
            </div>
            <div>
              <FieldLabel required>Module</FieldLabel>
              <input
                list="module-options"
                value={form.module}
                onChange={(event) => setForm((prev) => ({ ...prev, module: event.target.value }))}
                className={inputClass()}
              />
              <datalist id="module-options">
                {moduleOptions.map((moduleName) => (
                  <option key={moduleName} value={moduleName} />
                ))}
              </datalist>
            </div>
            <div>
              <FieldLabel required>Content type</FieldLabel>
              <select value={form.type} onChange={(event) => setType(event.target.value)} className={inputClass()}>
                {CONTENT_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>Tags (comma separated)</FieldLabel>
              <input value={form.tags} onChange={(event) => setForm((prev) => ({ ...prev, tags: event.target.value }))} className={inputClass()} placeholder="perceptron, intro" />
            </div>
            <div>
              <FieldLabel>Order index</FieldLabel>
              <input type="number" value={form.order_index} onChange={(event) => setForm((prev) => ({ ...prev, order_index: event.target.value }))} className={inputClass()} />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>Description</FieldLabel>
              <textarea value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} rows={2} className={inputClass()} />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 space-y-4">
            <h2 className="font-display text-base font-bold">{typeEntry.label} fields</h2>
            {typeEntry.fields.map((field) => (
              <div key={field.name}>
                <FieldLabel required={field.required}>{field.label}</FieldLabel>
                {field.type === 'textarea' && (
                  <textarea
                    value={form.metadata[field.name] || ''}
                    onChange={(event) => setMeta(field.name, event.target.value)}
                    rows={6}
                    className={`${inputClass()} font-mono text-xs`}
                  />
                )}
                {(field.type === 'text' || field.type === 'url') && (
                  <input
                    type={field.type === 'url' ? 'url' : 'text'}
                    value={form.metadata[field.name] || ''}
                    onChange={(event) => setMeta(field.name, event.target.value)}
                    className={inputClass()}
                    placeholder={field.type === 'url' ? 'https://' : ''}
                  />
                )}
                {field.type === 'file' && (
                  <input
                    type="file"
                    accept={field.accept}
                    onChange={(event) => setMeta(field.name, event.target.files?.[0] || '')}
                    className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-purple-50 file:text-purple-700 file:font-bold"
                  />
                )}
                {field.type === 'array-of-pairs' && (
                  <div className="space-y-2">
                    {(form.metadata[field.name] || []).map((row, index) => (
                      <div key={`${field.name}-${index}`} className="flex flex-col sm:flex-row gap-2">
                        {field.pairKeys.map((key, keyIndex) => (
                          <input
                            key={key}
                            value={row[key] || ''}
                            onChange={(event) => updatePair(field, index, key, event.target.value)}
                            className={inputClass()}
                            placeholder={field.pairLabels?.[keyIndex] || key}
                          />
                        ))}
                        <button
                          type="button"
                          onClick={() => removePair(field, index)}
                          className="px-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500"
                          title="Remove row"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addPair(field)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add {form.type === 'flashcards' ? 'card' : 'row'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-bold text-sm shadow-md shadow-purple-600/25"
          >
            {submitting ? 'Publishing…' : 'Publish content'}
          </button>
        </form>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-extrabold">Recently added</h2>
          {recent.length === 0 ? (
            <p className="text-sm text-slate-400">Nothing published yet.</p>
          ) : (
            <div className="space-y-2">
              {recent.map((item) => (
                <div key={item.id} className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600">
                      {CONTENT_REGISTRY[item.type]?.label || item.type} · {item.module}
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(item)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
