import firebase from 'utils/firebase';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import store from 'store';
import Home from 'pages/Home';
import { Grommet, Main, ThemeType } from 'grommet';
import LoadingSpinner from 'components/LoadingSpinner';
import { Reset } from 'styled-reset';

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

  return appLoaded ? <Home /> : <LoadingSpinner />;
};

const theme: ThemeType = {
  global: {
    font: {
      family: `-apple-system, BlinkMacSystemFont, "Segoe UI"`,
    },
    colors: {
      brand: '#38353a'
    }
  },
  card: {
    container: {
      background: '#FFFFFF12',
      elevation: 'none',
    },
    footer: {
      pad: { horizontal: 'medium', vertical: 'small' },
      background: '#FFFFFF06',
    },
  },
};

ReactDOM.render(
  <React.StrictMode>
    <Reset />
    <Grommet theme={theme} themeMode="dark" full>
      <Main pad="large" background="brand" align="center">
        <App />
      </Main>
    </Grommet>
  </React.StrictMode>,
  document.getElementById('root')
);
