import React from 'react';
import 'typeface-roboto';
import './App.scss';
import { AdminPanel } from './components/AdminPanel/AdminPanel';
import { ThemeProvider } from '@material-ui/core/styles';
import { darkTheme } from './assets/theme';
import { Header } from './components/Header/Header';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Header />
      <AdminPanel />
    </ThemeProvider>
  );
}

export default App;
