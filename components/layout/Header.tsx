import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { GoSignIn, GoSignOut } from 'react-icons/go';

import { HamburgerIcon, SunIcon } from '@chakra-ui/icons';
import {
    Box, Button, Flex, Icon, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Spacer,
    useColorMode
} from '@chakra-ui/react';

import useAuth from '../../hooks/useAuth';
import Logo from './Logo';

interface Props {
  avatar: string;
  handleLogout: () => void;
  loading?: boolean;
}

const Header: FC<Props> = ({ avatar, handleLogout, loading = false }) => {
  const session = useAuth(false);
  const router = useRouter();
  // const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex backgroundColor="black" alignItems="center">
      <Logo />
      <Spacer />
      {/* <Box py="2" px="1">
        <IconButton
          aria-label="Toggle Colour Mode"
          size="md"
          icon={<SunIcon />}
          onClick={toggleColorMode}
        />
      </Box> */}
      {session && !loading && avatar && (
        <Button onClick={() => router.push('/profile')} variant="unstyled">
          <Image
            boxSize="36px"
            borderRadius="4"
            objectFit="cover"
            src={avatar}
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
  );
};

export default Header;
