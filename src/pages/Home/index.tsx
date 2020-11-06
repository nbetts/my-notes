import Notes from 'components/Notes';
import SignInCard from 'components/SignInCard';
import React from 'react';
import store from 'store';

const Home = () => {
  const email = store.useState(s => s.email);
  
  return email ? <Notes /> : <SignInCard />;
};

export default Home;
