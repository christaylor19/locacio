import { FC } from 'react';

import { Heading } from '@chakra-ui/react';

import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';

const Home: FC = () => {
  const session = useAuth(false);

  return (
    <Layout session={session}>
      <Heading>Landing Page</Heading>
    </Layout>
  );
};

export default Home;
