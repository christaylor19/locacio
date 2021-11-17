import { useRouter } from 'next/router';

import { supabase } from '../utils/supabase';

const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error: any) {
      console.error('Logging Out', error.message);
    }
  };

  return {
    handleLogout,
  };
};

export default useLogout;
