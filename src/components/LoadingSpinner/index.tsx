
import { Box } from 'grommet';
import React from 'react';
import { WhisperSpinner } from 'react-spinners-kit';

const LoadingSpinner = () => (
  <Box fill align="center" justify="center">
    <WhisperSpinner />
  </Box>
);

export default LoadingSpinner;
