import { useEffect, useState } from 'react';

import { Session } from '@supabase/supabase-js';

import Account from '../components/Account';
import Auth from '../components/Auth';
import Layout from '../components/Layout';
import { supabase } from '../utils/supabase';

const Home: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Layout>{!session ? <Auth /> : <Account key={session.user?.id} session={session} />}</Layout>
  );
};

export default Home;
