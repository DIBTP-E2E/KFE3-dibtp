import { supabaseServerClient } from '@/lib/supabase';

export async function setServerSession(email: string, password: string) {
  const supabase = await supabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw error;
}
