import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Box, Button, Text } from 'grommet';
import { Trash } from 'grommet-icons';
import React from 'react';
import { Note } from 'types';

interface NotesListItemProps {
  note: Note;
  highlighted?: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

const NotesListItem = ({ note, highlighted, onSelect, onDelete }: NotesListItemProps) => {
  let displayText = '(empty note)';

  if (note.content) {
    const newLineIndex = note.content.indexOf('\n');
    displayText = newLineIndex >= 0 ? note.content.substring(0, newLineIndex) : note.content;
  }

  return (
    <Box
      key={note.id}
      pad="small"
      border="bottom"
      background={highlighted ? 'dark-1' : 'none'}
      hoverIndicator="dark-1"
      onClick={onSelect}
    >
      <Box direction="row" justify="between" align="center">
        <Text truncate>{displayText}</Text>
      </Box>
      <Box direction="row" justify="between" align="center" margin={{ top: 'xsmall' }}>
        <Text size="small" color="dark-4">
          {formatDistanceToNow(note.dateModified.toDate(), { includeSeconds: true, addSuffix: true })}
        </Text>
        <Button plain icon={<Trash color="dark-4" size="16" />} onClick={onDelete} />
      </Box>
    </Box>
  );
};

export default NotesListItem;
