import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyBzSm7kol1TdiXkVGzpB5vhdhwCEGN_OXM",
  authDomain: "my-notes-41f39.firebaseapp.com",
  databaseURL: "https://my-notes-41f39.firebaseio.com",
  projectId: "my-notes-41f39",
  storageBucket: "my-notes-41f39.appspot.com",
  messagingSenderId: "1060950535192",
  appId: "1:1060950535192:web:dee4551d856cbb58ee676d"
};

const firebase = firebaseApp.initializeApp(config);

export default firebase;
