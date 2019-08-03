import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { create } from 'jss';
import { createMuiTheme } from '@material-ui/core';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import './index.css';
import App from './App';

const theme = createMuiTheme();

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point')
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StylesProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
