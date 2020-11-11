import Button from 'components/Button';
import ErrorPopup from 'components/ErrorPopup';
import HelpPopup from 'components/HelpPopup';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Box, InfiniteScroll, Layer, Menu, Nav, Paragraph, Sidebar, Text } from 'grommet';
import { Trash } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import store, { createNote, deleteNote, signOut } from 'store';
import { Note } from 'types';
import NoteEditor from './NoteEditor';

const Notes = () => {
  const [submitting, setSubmitting] = useState(false);
  const [helpDisplayed, setHelpDisplayed] = useState(false);
  const [deleteConfirmationDisplayed, setDeleteConfirmationDisplayed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const email = store.useState(s => s.user.email);
  let notes = store.useState(s => s.notes);
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const selectedNoteIndex = notes.findIndex(({ id }) => id === selectedNoteId);

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

  const closeDeleteConfirmation = () => setDeleteConfirmationDisplayed(false);

  return (
    <>
      <Sidebar
        width="medium"
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
                    background={index === selectedNoteIndex ? "dark-1" : "none"}
                    hoverIndicator="dark-1"
                    onClick={() => setSelectedNoteId(note.id)}
                  >
                    <Box direction="row" justify="between" align="center">
                      <Text truncate>{displayText}</Text>
                    </Box>
                    <Box direction="row" justify="between" align="center" margin={{ top: 'xsmall' }}>
                      <Text size="small" color="dark-4">
                        {formatDistanceToNow(note.dateModified.toDate(), { includeSeconds: true, addSuffix: true })}
                      </Text>
                      <Button plain icon={<Trash color="dark-4" size="16" />} onClick={() => setDeleteConfirmationDisplayed(true)} />
                    </Box>
                  </Box>
                );
              }}
            </InfiniteScroll>
          </Box>
        </Nav>
      </Sidebar>
      <Box pad="small" fill>
        {selectedNoteIndex >= 0 && <NoteEditor note={notes[selectedNoteIndex]} />}
      </Box>
      {deleteConfirmationDisplayed && (
        <Layer onEsc={closeDeleteConfirmation} onClickOutside={closeDeleteConfirmation} animation="fadeIn">
          <Box background="brand" align="center" justify="center" pad="medium" elevation="large">
            <Paragraph margin="xsmall">Are you sure you want to delete this note?</Paragraph>
            <Box fill direction="row" justify="evenly" margin={{ top: 'medium' }}>
              <Button primary label="Yes" onClick={() => deleteNote(notes[selectedNoteIndex].id)} />
              <Button secondary label="Cancel" onClick={closeDeleteConfirmation} />
            </Box>
          </Box>
        </Layer>
      )}
      {errorMessage && <ErrorPopup message={errorMessage} onClose={() => setErrorMessage('')} />}
      {helpDisplayed && <HelpPopup onClose={() => setHelpDisplayed(false)} />}
    </>
  );
};

export default Notes;
