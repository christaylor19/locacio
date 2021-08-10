import { useRouter } from 'next/router';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { GoHome, GoSignIn, GoSignOut } from 'react-icons/go';

import {
    AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon, SunIcon
} from '@chakra-ui/icons';
import {
    Avatar, Box, Button, Container, Flex, Icon, IconButton, Image, Menu, MenuButton, MenuItem,
    MenuList, Spacer, useColorMode, WrapItem
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
      console.error('Getting Profile', error.message);
    } finally {
      setLoading(false);
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

  return (
    <Flex className="container" direction="column" h="100vh" backgroundColor="#F5F8FA">
      <Flex backgroundColor="black" alignItems="center" px="8">
        <Box p="2">
          <Button
            leftIcon={<Icon w={6} h={6} as={GoHome} />}
            size="lg"
            onClick={() => (session ? router.push('/dashboard') : router.push('/'))}
          >
            Locacio
          </Button>
        </Box>
        <Spacer />
        <Box py="2" px="1">
          <IconButton
            aria-label="Toggle Colour Mode"
            size="md"
            icon={<SunIcon />}
            onClick={toggleColorMode}
          />
        </Box>
        {session && !loading && avatar_url && (
          <Button onClick={() => router.push('/profile')} variant="unstyled">
            <Image
              boxSize="36px"
              borderRadius="4"
              objectFit="cover"
              src={avatar_url}
              alt="Chris Taylor"
            />
          </Button>
        )}
        <Menu gutter={16}>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
            backgroundColor="white"
          />
          <MenuList>
            <MenuItem
              icon={
                session ? <Icon w={4} h={4} as={GoSignOut} /> : <Icon w={4} h={4} as={GoSignIn} />
              }
              onClick={() => (session ? handleLogout() : router.push('login'))}
            >
              {session ? 'Log Out' : 'Log In'}
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Flex direction="column" flex="1">
        <Container maxW="container.lg" h="full" backgroundColor="white">
          {children}
        </Container>
      </Flex>
    </Flex>
  );
};

export default Layout;
