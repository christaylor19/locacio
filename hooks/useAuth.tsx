import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Session } from '@supabase/supabase-js';

import { supabase } from '../utils/supabase';

const useAuth = (requiresAuth: boolean) => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (requiresAuth && !!session) router.push('/');
    });
  }, []);

  return session;
};

export default useAuth;
