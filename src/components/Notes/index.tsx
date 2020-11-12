import ErrorAlert from 'components/Alerts/ErrorAlert';
import React from 'react';
import store, {  updateNote } from 'store';
import NoteEditor from './components/NoteEditor';
import NotesSidebar from './components/NotesSidebar';

const Notes = () => {
  const selectedNote = store.useState(s => s.selectedNote);
  const errorMessage = store.useState(s => s.errorMessage);

  return (
    <>
      <NotesSidebar />
      {selectedNote && <NoteEditor note={selectedNote} onChange={(content) => updateNote(selectedNote.id, content)} />}
      {errorMessage && <ErrorAlert message={errorMessage} />}
    </>
  );
};

export default Notes;
