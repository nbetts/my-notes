import { Box, Grid, Markdown, TextArea } from 'grommet';
import React, { useCallback, useEffect, useState } from 'react';
import { Note } from 'types';
import debounce from 'lodash.debounce';
import { updateNote } from 'store';

interface NoteEditorProps {
  note: Note;
}

const NoteEditor = ({ note }: NoteEditorProps) => {
  const [content, setContent] = useState(note.content);
  // Callback dependency is known upfront
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateNote = useCallback(debounce((newContent: string) => updateNote(note.id, newContent), 500), [note]);

  useEffect(() => {
    setContent(note.content);
  }, [note]);

  return (
    <Box pad="small" fill>
      <Grid columns={{ count: 2, size: 'auto '}} fill gap="small">
        <Box elevation="large" pad="small">
          <TextArea
            fill
            resize={false}
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
              debouncedUpdateNote(event.target.value);
            }}
            />
        </Box>
        <Box elevation="large" pad="small" overflow="auto">
          <Markdown>{content}</Markdown>
        </Box>
      </Grid>
    </Box>
  );
};

export default NoteEditor;
