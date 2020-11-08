import Button from 'components/Button';
import ErrorPopup from 'components/ErrorPopup';
import { Menu, Nav, Sidebar } from 'grommet';
import React, { useEffect, useState } from 'react';
import store, { createNote, getNotes, signOut } from 'store';

const Notes = () => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const email = store.useState(s => s.user.email);
  const notes = store.useState(s => s.notes);

  useEffect(() => {
    getNotes();
  }, []);

  const handleCreateNote = async () => {
    setSubmitting(true);
    setErrorMessage('');

    try {
      await createNote();
      getNotes();
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
        header={<Menu label={email} items={[{ label: 'Sign out', onClick: signOut }]} />}
      >
        <Nav gap="small">
          {notes.map(((note, index) => <Button key={note.id} label={`Note ${index + 1}`} onClick={() => console.log(note)} />))}
          <Button label="+ Add note" onClick={handleCreateNote} loading={submitting} />
        </Nav>
      </Sidebar>
      {errorMessage && <ErrorPopup message={errorMessage} onClose={() => setErrorMessage('')} />}
    </>
  );
};

export default Notes;
