import { Box, Button, Layer } from 'grommet';
import React from 'react';

interface HelpPopupProps {
  onClose: () => void;
}

const HelpPopup = ({ onClose }: HelpPopupProps) => {
  return (
    <Layer full animation="fadeIn">
      <Box fill background="light-4" align="center" justify="center">
        <Button primary label="Close" onClick={onClose} />
      </Box>
    </Layer>
  );
};

export default HelpPopup;
