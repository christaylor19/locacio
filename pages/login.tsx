import { useRouter } from 'next/router';
import { FC } from 'react';

import Auth from '../components/Auth';
import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';

const Login: FC = () => {
  const session = useAuth(false);
  const router = useRouter();
  if (session) router.push('/dashboard');
  return (
    <Layout session={session}>
      <Auth />
    </Layout>
  );
};

export default Login;
