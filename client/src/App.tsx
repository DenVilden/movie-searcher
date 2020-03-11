import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import Header from './containers/Header';

const HomePage = lazy(() => import('./pages/HomePage'));
const MoviePage = lazy(() => import('./pages/MoviePage'));

const App = () => (
  <Router>
    <Header />
    <Suspense fallback={<LinearProgress color="secondary" />}>
      <Switch>
        <Route component={HomePage} exact path="/" />
        <Route
          path="/movie/:id"
          render={({
            match: {
              params: { id },
            },
          }) => <MoviePage id={id} />}
        />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
