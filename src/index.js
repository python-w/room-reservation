import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, unstable_createMuiStrictModeTheme as createMuiStrictModeTheme } from '@material-ui/core/styles';

const theme = createMuiStrictModeTheme();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
