import Button from 'components/Button';
import ErrorPopup from 'components/ErrorPopup';
import HelpPopup from 'components/HelpPopup';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Box, InfiniteScroll, Menu, Nav, Sidebar, Text } from 'grommet';
import React, { useEffect, useState } from 'react';
import store, { createNote, getNotes, signOut } from 'store';
import { Note } from 'types';
import NoteEditor from './NoteEditor';

const Notes = () => {
  const [submitting, setSubmitting] = useState(false);
  const [helpDisplayed, setHelpDisplayed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const email = store.useState(s => s.user.email);
  let notes = store.useState(s => s.notes);
  notes = [...notes].sort((a, b) => b.dateModified.seconds - a.dateModified.seconds);
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const selectedNoteIndex = notes.findIndex(({ id }) => id === selectedNoteId);
  console.log('notes', notes);
  console.log('notes[selectedNoteIndex]', notes[selectedNoteIndex]);

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() =>  {
    if (!selectedNoteId) {
      setSelectedNoteId(notes.length > 0 ? notes[0].id : '');
    }
  }, [notes, selectedNoteId]);

  const handleCreateNote = async () => {
    setSubmitting(true);
    setErrorMessage('');

    try {
      await createNote();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Sidebar
        elevation="large"
        pad="none"
        gap="none"
        header={<Menu margin="small" label={email} items={[{ label: 'Sign out', onClick: signOut }]} />}
        footer={<Button margin="small" label="Help" onClick={() => setHelpDisplayed(true)} />}
      >
        <Nav gap="small">
          <Button margin="small" label="+ Add note" onClick={handleCreateNote} loading={submitting} />
          <Box overflow="auto" border="top">
            <InfiniteScroll items={notes}>
              {(note: Note, index: number) => {
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
                    background={index === selectedNoteIndex ? "dark-2" : "none"}
                    hoverIndicator="background"
                    onClick={() => setSelectedNoteId(note.id)}
                  >
                    <Text truncate>{displayText}</Text>
                    <Text size="small" color="dark-4" margin={{ top: 'xsmall' }}>
                      {formatDistanceToNow(note.dateModified.toDate(), { includeSeconds: true, addSuffix: true })}
                    </Text>
                  </Box>
                );
              }}
            </InfiniteScroll>
          </Box>
        </Nav>
      </Sidebar>
      {selectedNoteIndex >= 0 && <NoteEditor note={notes[selectedNoteIndex]} />}
      {errorMessage && <ErrorPopup message={errorMessage} onClose={() => setErrorMessage('')} />}
      {helpDisplayed && <HelpPopup onClose={() => setHelpDisplayed(false)} />}
    </>
  );
};

export default Notes;
