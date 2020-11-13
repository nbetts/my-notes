import { Heading, Box } from 'grommet';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import utilsFirebase from 'utils/firebase';

const firebaseUiConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ]
};

const SignInCard = () => (
  <Box pad="medium" gap="medium" width="medium" elevation="large" align="center">
    <Heading>Sign in</Heading>
    <Box fill round="xsmall">
      <StyledFirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={utilsFirebase.auth()}/>
    </Box>
  </Box>
);

export default SignInCard;
