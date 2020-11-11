import { Box, Button, Heading, Layer, Paragraph } from 'grommet';
import React from 'react';

interface HelpPopupProps {
  onClose: () => void;
}

const HelpPopup = ({ onClose }: HelpPopupProps) => {
  return (
    <Layer onEsc={onClose} onClickOutside={onClose} animation="fadeIn">
      <Box background="brand" align="center" justify="center" pad="medium" elevation="large">
        <Heading margin={{ bottom: 'medium' }}>Help</Heading>
        <Paragraph margin="xsmall">My Notes is a cloud app that allows you to saves notes in the cloud.</Paragraph>
        <Paragraph margin="xsmall">The note editor can present notes in Markdown and are saved in real time.</Paragraph>
        <Paragraph margin="xsmall">Notes can be deleted with the trash icon and will be immediately removed from the server.</Paragraph>
        <Button primary label="Close" onClick={onClose} margin={{ top: 'medium' }} />
      </Box>
    </Layer>
  );
};

export default HelpPopup;
