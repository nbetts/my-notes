import firebase from 'utils/firebase';
import { Store } from 'pullstate';
import { Note, User } from 'types';

/**
 * Store state.
 * @param busy Whether or not the app is busy performing an action (not yet used)
 * @param user The user
 * @param notes The user's notes
 */
interface IStore {
  busy: boolean;
  user: User;
  notes: Note[];
}

const defaultState: IStore = {
  busy: false,
  user: {
    email: '',
  },
  notes: [],
};

const store = new Store<IStore>(defaultState);

export const signIn = async (email: string, password: string) => {
  await firebase.auth().signInWithEmailAndPassword(email, password);
  store.update(s => {
    s.user = { email };
  });
};

export const signOut = async () => {
  await firebase.auth().signOut();
  store.update(s => {
    s.user = defaultState.user;
    s.notes = defaultState.notes;
  });
};

export const getNotes = async () => {
  const response = await firebase.firestore().collection('notes').orderBy('dateModified', 'desc').get();

  const notes = response.docs.map<Note>((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      content: data.content,
      deleted: data.deleted,
      dateCreated: data.dateCreated,
      dateModified: data.dateModified,
    };
  });

  store.update(s => {
    s.notes = notes;
  });
};

export const createNote = async () => {
  const date = new Date();
  await firebase.firestore().collection('notes').add({
    content: '',
    deleted: false,
    dateCreated: date,
    dateModified: date,
  });
  getNotes();
};

export const updateNote = async (id: string, content: string) => {
  const date = new Date();
  await firebase.firestore().collection('notes').doc(id).update({
    content,
    dateModified: date,
  });
  getNotes();
};

export const deleteNote = async (id: string) => {
  await firebase.firestore().collection('notes').doc(id).delete();
  getNotes();
};

export default store;
