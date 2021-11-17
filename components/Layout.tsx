import { useRouter } from 'next/router';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { Container, Flex } from '@chakra-ui/react';
import { Session } from '@supabase/supabase-js';

import { supabase } from '../utils/supabase';
import Header from './layout/header';

interface Props {
  children: ReactElement;
  session: Session | null;
}

const Layout: FC<Props> = ({ children, session }) => {
  console.group('Layout');
  const router = useRouter();
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  console.log('avatar_url: ', avatar_url);
  const [loading, setLoading] = useState(true);
  console.log('loading: ', loading);

  useEffect(() => {
    console.group('useEffect');
    console.log('session: ', session);
    getProfile();
    console.groupEnd();
  }, [session]);

  async function getProfile() {
    console.group('getProfile');
    try {
      setLoading(true);
      const user = supabase.auth.user();
      console.log('user: ', user);

      if (!user) throw new Error('');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single();
      console.log('data: ', data);
      console.log('status: ', status);
      console.log('error: ', error);

      if (error && status !== 406) {
        throw error;
      }

      if (data && data.avatar_url) {
        const { data: data2, error: error2 } = await supabase.storage
          .from('avatars')
          .download(data.avatar_url);
        if (error2) {
          throw error2;
        }
        const url = URL.createObjectURL(data2);
        setAvatarUrl(url);
      }
    } catch (error) {
      console.error('Getting Profile', error.message);
      console.groupEnd();
    } finally {
      setLoading(false);
      console.groupEnd();
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Logging Out', error.message);
    }
  };
  console.groupEnd();
  return (
    <Flex className="container" direction="column" h="100vh" bg="brown">
      <Header handleLogout={handleLogout} avatar={avatar_url || ''} loading={loading} />
      <Flex direction="column" flex="1">
        <Container maxW="container.lg" h="full" backgroundColor="white">
          {children}
        </Container>
      </Flex>
    </Flex>
  );
};

export default Layout;
