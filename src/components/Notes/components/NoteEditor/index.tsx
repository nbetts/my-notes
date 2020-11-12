import { Box, Grid, Markdown, TextArea } from 'grommet';
import React, { useCallback, useEffect, useState } from 'react';
import { Note } from 'types';
import debounce from 'lodash.debounce';

interface NoteEditorProps {
  note: Note;
  onChange: (content: string) => void;
}

const NoteEditor = ({ note, onChange }: NoteEditorProps) => {
  const [content, setContent] = useState(note.content);

  // Debounce the onChange event to prevent too many calls. The callback dependency here is known upfront.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateNote = useCallback(debounce((newContent: string) => onChange(newContent), 500), [note]);

  useEffect(() => {
    setContent(note.content);
  }, [note]);

  return (
    <Grid columns={{ count: 2, size: 'auto '}} fill gap="small" pad="small">
      <Box elevation="large" pad="small">
        <TextArea
          fill
          resize={false}
          value={content}
          placeholder="Enter some text here..."
          onChange={(event) => {
            setContent(event.target.value);
            debouncedUpdateNote(event.target.value);
          }}
          />
      </Box>
      <Box elevation="large" pad="small" overflow="auto">
        <Markdown>{content || 'And Markdown will appear here!'}</Markdown>
      </Box>
    </Grid>
  );
};

export default NoteEditor;
