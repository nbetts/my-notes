import firebase from 'utils/firebase';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import store from 'store';
import Home from 'pages/Home';
import { Grommet, Main } from 'grommet';
import LoadingSpinner from 'components/LoadingSpinner';
import { Reset } from 'styled-reset';
import theme from 'utils/theme';

const App = () => {
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.update(s => {
          s.user = { email: user.email || '' };
        });
      }
      setAppLoaded(true);
    });
  }, []);

  return appLoaded ? <Home /> : <LoadingSpinner />;
};

ReactDOM.render(
  <React.StrictMode>
    <Reset />
    <Grommet theme={theme} themeMode="dark" full>
      <Main background="brand">
        <App />
      </Main>
    </Grommet>
  </React.StrictMode>,
  document.getElementById('root')
);
