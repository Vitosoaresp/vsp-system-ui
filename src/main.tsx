import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './context/theme';
import { Router } from './router';
import { store } from './store';

import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark">
        <Toaster duration={3000} />
        <Router />
        <Analytics />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
