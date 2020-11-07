import { Button, Menu, Nav, Sidebar } from 'grommet';
import React from 'react';
import store, { signOut } from 'store';

const Notes = () => {
  const email = store.useState(s => s.email);

  return (
    <Sidebar
      elevation="large"
      header={<Menu label={email} items={[{ label: 'Sign out', onClick: signOut }]} />}
    >
      <Nav gap="small">
        <Button label="Note 1" />
      </Nav>
    </Sidebar>
  );
};

export default Notes;
