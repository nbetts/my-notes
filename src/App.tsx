import SignInCard from 'components/SignInCard';
import React from 'react';
import store, { signOut } from 'store';

const App = () => {
  const email = store.useState(s => s.email);

  return (
    <div>
      {email ? (
        <div>
          <p>You are signed in as {email}</p>
          <button onClick={signOut}>Sign out</button>
        </div>
      ) : <SignInCard />
      }
    </div>
  );
};

export default App;
