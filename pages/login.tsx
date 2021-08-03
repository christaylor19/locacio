import { FC } from 'react';

import Auth from '../components/Auth';
import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';

const Login: FC = () => {
  const session = useAuth(false);

  return (
    <Layout session={session}>
      <Auth />
    </Layout>
  );
};

export default Login;
