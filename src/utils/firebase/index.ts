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

// Uncomment to use the firebase emulators.
// if (process.env.NODE_ENV !== 'production') {
//   console.log('Using firebase emulator for auth and firestore');
//   firebase.auth().useEmulator('http://localhost:9099/');
//   firebase.firestore().useEmulator('localhost', 8080);
// }

export default firebase;
