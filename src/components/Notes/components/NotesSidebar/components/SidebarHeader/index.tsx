import { Box, Menu, Text } from 'grommet';
import { Down } from 'grommet-icons';
import React from 'react';
import store, { signOut } from 'store';

const SidebarHeader = () => {
  const email = store.useState(s => s.user.email);

  return (
    <Menu
      plain
      margin="small"
      label={email}
      items={[{ label: 'Sign out', onClick: signOut }]}
      children={() => (
        <Box direction="row" align="center" pad="small">
          <Text truncate>{email}</Text>
          <Box pad={{ left: 'small' }}>
            <Down color="accent-1" size="16" />
          </Box>
        </Box>
      )}
    />
  );
};

export default SidebarHeader;

