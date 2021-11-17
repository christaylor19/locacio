import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Session } from '@supabase/supabase-js';

import { supabase } from '../utils/supabase';

const useAuth = (requiresAuth: boolean) => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.group('useAuth');
    console.log('requiresAuth: ', requiresAuth);
    const authSession = supabase.auth.session();
    console.log('authSession: ', authSession);
    if (requiresAuth && !authSession) router.push('/');
    if (requiresAuth && authSession) router.push('/dashboard');
    setSession(authSession);

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session: ', session);

      setSession(session);
      if (requiresAuth && !session) router.push('/');
    });
    console.groupEnd();
  }, []);

  useEffect(() => {
    if (requiresAuth && !session) router.push('/');
    if (requiresAuth && session) router.push('/dashboard');
  }, [session]);

  return session;
};

export default useAuth;
