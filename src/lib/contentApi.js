import { supabase, isSupabaseConfigured } from './supabaseClient';

const BUCKET = 'content-assets';

export function requireSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
  }
  return supabase;
}

export async function fetchContentItems() {
  const client = requireSupabase();
  const { data, error } = await client
    .from('content_items')
    .select('*')
    .order('module', { ascending: true })
    .order('order_index', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchRecentContentItems(limit = 8) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('content_items')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function insertContentItem(row) {
  const client = requireSupabase();
  const { data, error } = await client.from('content_items').insert(row).select().single();
  if (error) throw error;
  return data;
}

export async function deleteContentItem(id) {
  const client = requireSupabase();
  const { error } = await client.from('content_items').delete().eq('id', id);
  if (error) throw error;
}

export async function uploadContentAsset(file, folder = 'uploads') {
  const client = requireSupabase();
  const safeName = file.name.replace(/[^\w.\-]+/g, '-');
  const path = `${folder}/${crypto.randomUUID()}-${safeName}`;
  const { error } = await client.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;
  const { data } = client.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
