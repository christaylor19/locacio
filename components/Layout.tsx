import { FC, ReactElement } from 'react';
import { GoHome } from 'react-icons/go';

import { SunIcon } from '@chakra-ui/icons';
import { Box, Container, Flex, Icon, IconButton, Spacer, useColorMode } from '@chakra-ui/react';

interface Props {
  children: ReactElement;
}
const Layout: FC<Props> = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

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
        <Box p="2">
          <IconButton
            aria-label="Toggle Colour Mode"
            size="lg"
            icon={<SunIcon />}
            onClick={toggleColorMode}
          />
        </Box>
      </Flex>
      <Flex>{children}</Flex>
    </div>
  );
};

export default Layout;
