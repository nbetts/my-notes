import { Box, Button, Paragraph } from 'grommet';
import React from 'react';
import store, { signOut } from 'store';

const Notes = () => {
  const email = store.useState(s => s.email);

  return (
    <Box gap="medium">
      <Paragraph>You are signed in as {email}</Paragraph>
      <Button primary onClick={signOut} label="Sign out" />
    </Box>
  );
};

export default Notes;
