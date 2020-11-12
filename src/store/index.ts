import firebase from 'utils/firebase';
import { Store } from 'pullstate';
import { Note, User } from 'types';

/**
 * Store state.
 * @param loaded Whether or not the app has initially loaded
 * @param errorMessage An error message used for alerting the user of errors
 * @param user The user
 * @param notes The user's notes
 * @param selectedNote The note that is being edited
 * @param notesListener A listener function to receive real time updates to the notes collection in firebase
 */
interface IStore {
  loaded: boolean;
  errorMessage: string; 
  user: User;
  notes: Note[];
  selectedNote?: Note;
  notesListener?: () => void;
}

const defaultState: IStore = {
  loaded: false,
  errorMessage: '',
  user: {
    uid: '',
    email: '',
  },
  notes: [],
  selectedNote: undefined,
  notesListener: undefined,
};

const store = new Store<IStore>(defaultState);

let notesCollection = firebase.firestore().collection('users');

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    notesCollection = firebase.firestore().collection('users').doc(user.uid).collection('notes');

    store.update(s => {
      s.user = {
        uid: user.uid || '',
        email: user.email || '',
      };

      // Upon sign in, create a listener on the notes collection in firebase to receive real time updates.
      s.notesListener = notesCollection.orderBy('dateModified', 'desc').onSnapshot((snapshot) => {
        if (snapshot.docs.length) {
          const notes = snapshot.docs.map<Note>((doc) => {
            const data = doc.data();
        
            return {
              id: doc.id,
              uid: data.uid,
              content: data.content,
              dateCreated: data.dateCreated,
              dateModified: data.dateModified,
            };
          });
        
          store.update(s => {
            s.notes = notes;
            s.selectedNote = notes[0];
          });
        } else {
          store.update(s => {
            s.notes = [];
            s.selectedNote = undefined;
          });
        }
      });
    });
  } else {
    store.update(s => {
      // Upon sign out, terminate the note listener if it has been previously created.
      s.notesListener && s.notesListener();

      s.user = defaultState.user;
      s.notes = defaultState.notes;
      s.selectedNote = undefined;
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
    uid: store.getRawState().user.uid,
    content: '',
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

export const updateSelectedNote = (selectedNote: Note | undefined) => {
  store.update(s => {
    s.selectedNote = selectedNote;
  });
};

export const deleteNote = async (id: string) => {
  await notesCollection.doc(id).delete();
};

export const signIn = async (email: string, password: string) => {
  await firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signOut = async () => {
  await firebase.auth().signOut();
};

export const setErrorMessage = (errorMessage: string) => {
  store.update(s => {
    s.errorMessage = errorMessage;
  });
};

export default store;
