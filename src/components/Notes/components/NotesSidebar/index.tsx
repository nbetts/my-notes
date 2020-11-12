import Button from 'components/Button';
import DeleteNoteModal from 'components/Modals/DeleteNoteModal';
import HelpModal from 'components/Modals/HelpModal';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Box, InfiniteScroll, Menu, Nav, Sidebar, Text } from 'grommet';
import { Down, Trash } from 'grommet-icons';
import React, { useState } from 'react';
import store, { createNote, deleteNote, setErrorMessage, signOut, updateSelectedNote } from 'store';
import { Note } from 'types';

const NotesSidebar = () => {
  const email = store.useState(s => s.user.email);
  const notes = store.useState(s => s.notes);
  const selectedNote = store.useState(s => s.selectedNote);
  const selectedNoteIndex = notes.findIndex(({ id }) => id === selectedNote?.id);
  const [deleteNoteModalOpen, setDeleteNoteModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [addingNote, setAddingNote] = useState(false);

  const handleCreateNote = async () => {
    setAddingNote(true);

    try {
      await createNote();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setAddingNote(false);
    }
  };

  const handleDeleteNote = async () => {
    if (!selectedNote) {
      return;
    }

    try {
      await deleteNote(selectedNote.id);
      setDeleteNoteModalOpen(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Sidebar
      width="medium"
      elevation="large"
      pad="none"
      gap="none"
      header={(
        <Menu
          plain
          margin="small"
          label={email}
          items={[{ label: 'Sign out', onClick: signOut }]}
          children={() => (
            <Box direction="row" align="center" pad="small">
              <Text truncate>{email}</Text>
              <Box pad={{ left: 'small' }}>
                <Down color="accent-1" size="16" />
              </Box>
            </Box>
          )}
        />
      )}
      footer={<Button margin="small" label="Help" onClick={() => setHelpModalOpen(true)} />}
    >
      <Nav gap="small">
        <Button margin="small" label="+ Add note" onClick={handleCreateNote} loading={addingNote} />
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
                  onClick={() => updateSelectedNote(note)}
                >
                  <Box direction="row" justify="between" align="center">
                    <Text truncate>{displayText}</Text>
                  </Box>
                  <Box direction="row" justify="between" align="center" margin={{ top: 'xsmall' }}>
                    <Text size="small" color="dark-4">
                      {formatDistanceToNow(note.dateModified.toDate(), { includeSeconds: true, addSuffix: true })}
                    </Text>
                    <Button plain icon={<Trash color="dark-4" size="16" />} onClick={() => setDeleteNoteModalOpen(true)} />
                  </Box>
                </Box>
              );
            }}
          </InfiniteScroll>
        </Box>
      </Nav>
      {deleteNoteModalOpen && <DeleteNoteModal onConfirm={handleDeleteNote} onClose={() => setDeleteNoteModalOpen(false)} />}
      {helpModalOpen && <HelpModal onClose={() => setHelpModalOpen(false)} />}
    </Sidebar>
  );
};

export default NotesSidebar;
