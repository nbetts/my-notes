import firebase from 'firebase/app';
import 'firebase/auth';
import { Store } from 'pullstate';

interface IStore {
  email: string;
}

const store = new Store<IStore>({
  email: '',
});

export const signIn = async (email: string, password: string) => {
  await firebase.auth().signInWithEmailAndPassword(email, password);
  store.update(s => {
    s.email = email;
  });
};

export const signOut = async () => {
  await firebase.auth().signOut();
  store.update(s => {
    s.email = '';
  });
};

export default store;
