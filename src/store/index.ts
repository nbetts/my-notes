import firebase from 'utils/firebase';
import { Store } from 'pullstate';
import { Note, User } from 'types';

/**
 * Store state.
 * @param loaded Whether or not the app has initially loaded
 * @param user The user
 * @param notes The user's notes
 * @param notesListener A listener function to receive real time updates to the notes collection in firebase
 */
interface IStore {
  loaded: boolean;
  user: User;
  notes: Note[];
  notesListener?: () => void;
}

const defaultState: IStore = {
  loaded: false,
  user: {
    email: '',
  },
  notes: [],
};

const store = new Store<IStore>(defaultState);

const notesCollection = firebase.firestore().collection('notes');

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.update(s => {
      s.user = { email: user.email || '' };

      // Upon sign in, create a listener on the notes collection in firebase to receive real time updates.
      s.notesListener = notesCollection.orderBy('dateModified', 'desc').onSnapshot((snapshot) => {
        const notes = snapshot.docs.map<Note>((doc) => {
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
      });
    });
  } else {
    store.update(s => {
      s.user = defaultState.user;

      // Upon sign out, terminate the note listener if it has been previously created.
      s.notesListener && s.notesListener();
      s.notesListener = undefined;
    });
  }

  if (!store.getRawState().loaded) {
    store.update(s => {
      s.loaded = true;
    });
  }
});

export const createNote = async () => {
  const date = new Date();
  await notesCollection.add({
    content: '',
    deleted: false,
    dateCreated: date,
    dateModified: date,
  });
};

export const updateNote = async (id: string, content: string) => {
  const date = new Date();
  await notesCollection.doc(id).update({
    content,
    dateModified: date,
  });
};

export const deleteNote = async (id: string) => {
  await notesCollection.doc(id).delete();
};

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

export default store;
