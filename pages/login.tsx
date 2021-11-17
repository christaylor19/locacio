import { useRouter } from 'next/router';
import { FC } from 'react';

import { Heading } from '@chakra-ui/react';

import Layout from '../components/Layout';
import Auth from '../components/LoginForm';
import useAuth from '../hooks/useAuth';

const Login: FC = () => {
  const session = useAuth(false);
  const router = useRouter();
  if (session) router.push('/dashboard');
  return (
    <Layout session={session}>
      <>
        <Heading>Login</Heading>
        <Auth />
      </>
    </Layout>
  );
};

export default Login;
