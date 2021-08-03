import { FC } from 'react';

import { Flex, Heading } from '@chakra-ui/react';

import Account from '../components/Account';
import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';

const Dashboard: FC = () => {
  const session = useAuth(true);
  console.log('session: ', session);

  return (
    <Layout session={session}>
      {!session ? (
        <></>
      ) : (
        <>
          <Flex direction="column">
            <Heading>Dashboard</Heading>
            <Account key={session?.user?.id} session={session} />
          </Flex>
        </>
      )}
    </Layout>
  );
};

export default Dashboard;
