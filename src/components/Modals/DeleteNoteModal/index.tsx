import Button from 'components/Button';
import { Box, Layer, Text } from 'grommet';
import React from 'react'

interface DeleteNoteModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteNoteModal = ({ onConfirm, onClose }: DeleteNoteModalProps) => (
  <Layer onEsc={onClose} onClickOutside={onClose} animation="fadeIn">
    <Box background="brand" align="center" justify="center" pad="medium" elevation="large">
      <Text margin="xsmall">Are you sure you want to delete this note?</Text>
      <Box fill direction="row" justify="evenly" margin={{ top: 'medium' }}>
        <Button primary label="Yes" onClick={onConfirm} />
        <Button secondary label="Cancel" onClick={onClose} />
      </Box>
    </Box>
  </Layer>
);

export default DeleteNoteModal;
