import React from 'react';
import 'typeface-roboto';
import './App.scss';
import { AdminPanel } from './components/AdminPanel/AdminPanel';
import { ThemeProvider } from '@material-ui/core/styles';
import { darkTheme } from './assets/theme';
import { Header } from './components/Header/Header';
import { Switch, Route } from 'react-router-dom';
import { AuthorizationPanel } from './components/AuthorizationPanel/AuthorizationPanel';
import { AboutPage } from './components/AboutPage/AboutPage';
import { ActualPage } from './components/ActualPage/ActualPage';
import { Page404 } from './components/Page404/Page404';
import { WorkPage } from './components/WorkPage/WorkPage';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Header />
      <Switch>
        <Route path='/archive' component={AdminPanel} />
        <Route path='/actual' component={ActualPage} />
        <Route path='/manager' component={AuthorizationPanel} />
        <Route path='/work/:id' component={WorkPage} />
        <Route path='/' component={AboutPage} />
        <Route component={Page404} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
