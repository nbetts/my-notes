import firebase from 'utils/firebase';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import store from 'store';
import Home from 'pages/Home';

const App = () => {
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.update(s => {
          s.email = user.email || '';
        });
      }
      setAppLoaded(true);
    });
  }, []);

  return appLoaded ? <Home /> : <p>Loading...</p>;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
