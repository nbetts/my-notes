import { Box, Button, Layer, Text } from 'grommet';
import { CircleAlert, FormClose } from 'grommet-icons';
import React from 'react';

interface ErrorPopupProps {
  message?: string;
  onClose: () => void;
}

const ErrorPopup = ({ message, onClose }: ErrorPopupProps) => (
  <Layer
    position="bottom"
    modal={false}
    margin={{ vertical: 'medium', horizontal: 'small' }}
    onEsc={onClose}
    responsive={false}
    plain
  >
    <Box
      align="center"
      direction="row"
      gap="small"
      justify="between"
      round="medium"
      elevation="medium"
      pad={{ vertical: 'xsmall', horizontal: 'small' }}
      background="status-error"
    >
      <Box align="center" direction="row" gap="xsmall">
        <CircleAlert />
        <Text>{message}</Text>
      </Box>
      <Button icon={<FormClose />} onClick={onClose} plain />
    </Box>
  </Layer>
);

export default ErrorPopup;
