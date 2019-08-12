import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import GlobalStyle from './App.styles';
import Header from '../components/Header/Header.container';
import HomePage from '../pages/HomePage/HomePage.container';
import MoviePage from '../pages/MoviePage/MoviePage.container';

const App = () => (
  <Router>
    <GlobalStyle />
    <Header />
    <Switch>
      <Route component={HomePage} exact path="/" />
      <Route
        path="/movie/:id"
        render={({ match }) => <MoviePage id={match.params.id} />}
      />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </Router>
);

export default App;
