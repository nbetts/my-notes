
import { Box } from 'grommet';
import React from 'react';
import { JellyfishSpinner } from 'react-spinners-kit';
import { colors } from 'utils/theme';

interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner = ({ size }: LoadingSpinnerProps) => (
  <Box fill align="center" justify="center">
    <JellyfishSpinner size={size} color={colors["accent-1"]} />
  </Box>
);

export default LoadingSpinner;
