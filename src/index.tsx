import App from 'App';
import firebase from 'firebase/app';
import React from 'react';
import ReactDOM from 'react-dom';

const firebaseConfig = {
  apiKey: "AIzaSyBzSm7kol1TdiXkVGzpB5vhdhwCEGN_OXM",
  authDomain: "my-notes-41f39.firebaseapp.com",
  databaseURL: "https://my-notes-41f39.firebaseio.com",
  projectId: "my-notes-41f39",
  storageBucket: "my-notes-41f39.appspot.com",
  messagingSenderId: "1060950535192",
  appId: "1:1060950535192:web:dee4551d856cbb58ee676d"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
