import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function setServerSession(email: string, password: string) {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw error;
}
