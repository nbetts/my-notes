import ErrorAlert from 'components/Alerts/ErrorAlert';
import React from 'react';
import store, {  setErrorAlertMessage, updateNote } from 'store';
import NoteEditor from './components/NoteEditor';
import NotesSidebar from './components/NotesSidebar';

const Notes = () => {
  const selectedNote = store.useState(s => s.selectedNote);
  const errorMessage = store.useState(s => s.errorMessage);

  const handleUpdateNote = async (id: string, content: string) => {
    try {
      await updateNote(id, content);
    } catch (error) {
      setErrorAlertMessage(error.message);
    }
  };

  return (
    <>
      <NotesSidebar />
      {selectedNote && <NoteEditor note={selectedNote} onChange={(content) => handleUpdateNote(selectedNote.id, content)} />}
      {errorMessage && <ErrorAlert message={errorMessage} />}
    </>
  );
};

export default Notes;
