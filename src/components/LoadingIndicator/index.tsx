
import { Box } from 'grommet';
import React from 'react';
import { JellyfishSpinner } from 'react-spinners-kit';
import { colors } from 'utils/theme';

interface LoadingIndicatorProps {
  size?: number;
}

const LoadingIndicator = ({ size }: LoadingIndicatorProps) => (
  <Box fill align="center" justify="center">
    <JellyfishSpinner size={size} color={colors["accent-1"]} />
  </Box>
);

export default LoadingIndicator;
