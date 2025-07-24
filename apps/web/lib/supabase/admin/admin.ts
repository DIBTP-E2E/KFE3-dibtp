import { createClient } from '@supabase/supabase-js';

import type { Database } from '@/types/lib';

// Admin 클라이언트 (SERVICE_ROLE_KEY 사용)
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
