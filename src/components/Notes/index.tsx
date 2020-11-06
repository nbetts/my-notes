import React from 'react';
import store, { signOut } from 'store';

const Notes = () => {
  const email = store.useState(s => s.email);

  return (
    <div>
      <p>You are signed in as {email}</p>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};

export default Notes;
