// index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './components/redux/store';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as StylesThemeProvider } from '@mui/styles';

const theme = createTheme(); // Create a default theme

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Apply the Material-UI theme */}
      <MuiThemeProvider theme={theme}>
        {/* Apply the theme for components using '@mui/styles' */}
        <StylesThemeProvider theme={theme}>
          <CssBaseline />
          {/* Potential issue: Is there a BrowserRouter here? */}
          <App />
        </StylesThemeProvider>
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>
);
