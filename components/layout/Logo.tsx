import { useRouter } from 'next/router';
import React from 'react';
import { GoHome } from 'react-icons/go';

import { Box, Button, Icon } from '@chakra-ui/react';

import useAuth from '../../hooks/useAuth';

const Logo: React.FC = () => {
  console.group('Logo');
  const session = useAuth(false);
  console.log('session: ', session);
  const router = useRouter();
  console.groupEnd();
  return (
    <Box p="2">
      <Button
        leftIcon={<Icon w={6} h={6} as={GoHome} />}
        size="lg"
        onClick={() => (session ? router.push('/dashboard') : router.push('/'))}
      >
        Locacio
      </Button>
    </Box>
  );
};
export default Logo;
