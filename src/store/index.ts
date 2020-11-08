import firebase from 'utils/firebase';
import { Store } from 'pullstate';
import { Note, User } from 'types';

/**
 * Store state.
 * @param user The user
 * @param notes The user's notes
 * @param busy Whether or not the app is busy performing an action
 */
interface IStore {
  user: User;
  notes: Note[];
  busy: boolean;
}

const defaultState: IStore = {
  user: {
    email: '',
  },
  notes: [],
  busy: false,
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
  const response = await firebase.firestore().collection('notes').get();

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
};

export const deleteNote = async () => {

};

export default store;
