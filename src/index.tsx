import React from 'react';
import ReactDOM from 'react-dom';
import store from 'store';
import Home from 'pages/Home';
import { Grommet, Main } from 'grommet';
import LoadingIndicator from 'components/LoadingIndicator';
import { Reset } from 'styled-reset';
import theme from 'utils/theme';

const App = () => {
  const loaded = store.useState(s => s.loaded);
  return loaded ? <Home /> : <LoadingIndicator />;
};

ReactDOM.render(
  <React.StrictMode>
    <Reset />
    <Grommet theme={theme} themeMode="dark" full background="brand">
      <Main>
        <App />
      </Main>
    </Grommet>
  </React.StrictMode>,
  document.getElementById('root')
);
