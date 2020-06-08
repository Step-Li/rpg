import React from 'react';
import 'typeface-roboto';
import './App.scss';
import { ArchivePage } from './components/ArchivePage/ArchivePage';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './assets/theme';
import { Header } from './components/Header/Header';
import { Switch, Route } from 'react-router-dom';
import { AuthorizationPanel } from './components/AuthorizationPanel/AuthorizationPanel';
import { AboutPage } from './components/AboutPage/AboutPage';
import { ActualPage } from './components/ActualPage/ActualPage';
import { Page404 } from './components/Page404/Page404';
import { WorkPage } from './components/WorkPage/WorkPage';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
        <Switch>
          <Route path='/archive' component={ArchivePage} />
          <Route path='/actual' component={ActualPage} />
          <Route path='/manager' component={AuthorizationPanel} />
          <Route path='/work/:id' component={WorkPage} />
          <Route path='/' component={AboutPage} />
          <Route component={Page404} />
        </Switch>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
