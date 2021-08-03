import { FC } from 'react';

import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';

const Home: FC = () => {
  const session = useAuth(false);

  return (
    <Layout session={session}>
      <></>
    </Layout>
  );
};

export default Home;
