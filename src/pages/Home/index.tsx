import Notes from 'components/Notes';
import SignInCard from 'components/SignInCard';
import { Box } from 'grommet';
import React from 'react';
import store from 'store';

const Home = () => {
  const email = store.useState(s => s.email);
  
  return email ? (
    <Box fill direction="row">
      <Notes />
    </Box>
  ) : (
    <Box margin="large" alignSelf="center">
      <SignInCard />
    </Box>
  );
};

export default Home;
