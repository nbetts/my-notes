import LoadingButton from 'components/LoadingButton';
import DeleteNoteModal from 'components/Modals/DeleteNoteModal';
import { Box, InfiniteScroll, Nav, Sidebar } from 'grommet';
import React, { useState } from 'react';
import store, { createNote, deleteNote, setErrorAlertMessage, updateSelectedNote } from 'store';
import { Note } from 'types';
import NotesListItem from './components/NotesListItem';
import SidebarFooter from './components/SidebarFooter';
import SidebarHeader from './components/SidebarHeader';

const NotesSidebar = () => {
  const notes = store.useState(s => s.notes);
  const selectedNote = store.useState(s => s.selectedNote);
  const selectedNoteIndex = notes.findIndex(({ id }) => id === selectedNote?.id);
  const [deleteNoteModalOpen, setDeleteNoteModalOpen] = useState(false);
  const [addingNote, setAddingNote] = useState(false);

  const handleCreateNote = async () => {
    setAddingNote(true);

    try {
      await createNote();
    } catch (error) {
      setErrorAlertMessage(error.message);
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
      setErrorAlertMessage(error.message);
    }
  };

  return (
    <Sidebar width="medium" elevation="large" pad="none" gap="none" header={<SidebarHeader />} footer={<SidebarFooter />}>
      <Nav gap="small">
        <LoadingButton margin="small" label="+ Add note" onClick={handleCreateNote} loading={addingNote} />
        <Box overflow="auto" border="top">
          <InfiniteScroll items={notes}>
            {(note: Note, index: number) => (
              <NotesListItem
                key={note.id}
                note={note}
                highlighted={index === selectedNoteIndex}
                onSelect={() => updateSelectedNote(note)}
                onDelete={() => setDeleteNoteModalOpen(true)}
              />
            )}
          </InfiniteScroll>
        </Box>
      </Nav>
      {deleteNoteModalOpen && <DeleteNoteModal onConfirm={handleDeleteNote} onClose={() => setDeleteNoteModalOpen(false)} />}
    </Sidebar>
  );
};

export default NotesSidebar;
