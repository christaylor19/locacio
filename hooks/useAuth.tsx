import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Session } from '@supabase/supabase-js';

import { supabase } from '../utils/supabase';

const useAuth = (requiresAuth: boolean) => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authSession = supabase.auth.session();
    if (requiresAuth && !authSession) router.push('/');
    if (requiresAuth && authSession) router.push('/dashboard');
    console.log('requiresAuth: ', requiresAuth);
    console.log('authSession: ', authSession);
    setSession(authSession);

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (requiresAuth && !session) router.push('/');
    });
  }, []);

  useEffect(() => {
    if (requiresAuth && !session) router.push('/');
    if (requiresAuth && session) router.push('/dashboard');
  }, [session]);

  return session;
};

export default useAuth;
