import { useRouter } from 'next/router';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { GoHome } from 'react-icons/go';

import { SunIcon } from '@chakra-ui/icons';
import {
    Avatar, Box, Button, Flex, Icon, IconButton, Spacer, useColorMode, WrapItem
} from '@chakra-ui/react';
import { Session } from '@supabase/supabase-js';

import { supabase } from '../utils/supabase';

interface Props {
  children: ReactElement;
  session: Session | null;
}

const Layout: FC<Props> = ({ children, session }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      if (!user) throw new Error('');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single();

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
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <Flex e>
        <Box p="2">
          <IconButton
            aria-label="Toggle Colour Mode"
            size="lg"
            icon={<Icon as={GoHome} />}
            onClick={toggleColorMode}
          />
        </Box>
        <Spacer />
        <Box py="2" px="1">
          <IconButton
            aria-label="Toggle Colour Mode"
            size="lg"
            icon={<SunIcon />}
            onClick={toggleColorMode}
          />
        </Box>
        {session && !loading && avatar_url && (
          <Box py="2" px="1">
            <WrapItem>
              <Avatar name="Dan Abrahmov" src={avatar_url} />
            </WrapItem>
          </Box>
        )}
        <Box py="2" px="1">
          <Button
            size="lg"
            onClick={() => (session ? supabase.auth.signOut() : router.push('login'))}
          >
            {session ? 'Log Out' : 'Log In'}
          </Button>
        </Box>
      </Flex>
      <Flex>{children}</Flex>
    </div>
  );
};

export default Layout;
