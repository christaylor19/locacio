import { FC } from 'react';

import Account from '../components/Account';
import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';

const Dashboard: FC = () => {
  const session = useAuth(true);

  return (
    <Layout session={session}>
      {!session ? <></> : <Account key={session?.user?.id} session={session} />}
    </Layout>
  );
};

export default Dashboard;
