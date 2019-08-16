import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalStyle from './App.styles';
import Header from '../components/Header/Header.container';
import Spinner from '../components/Spinner/Spinner';

const HomePage = lazy(() => import('../pages/HomePage/HomePage.container'));
const MoviePage = lazy(() => import('../pages/MoviePage/MoviePage.container'));

const App = () => (
  <Router>
    <GlobalStyle />
    <Header />
    <Switch>
      <Suspense fallback={<Spinner />}>
        <Route component={HomePage} exact path="/" />
        <Route component={MoviePage} path="/movie/:id" />
      </Suspense>
    </Switch>
  </Router>
);

export default App;
