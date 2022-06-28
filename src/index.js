import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { SharedThemeProvider } from 'cx-portal-shared-components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SharedThemeProvider>
    <App />
    </SharedThemeProvider>
  </React.StrictMode>
);
