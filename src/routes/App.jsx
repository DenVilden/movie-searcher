import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Header from '../components/Header/Header';
import HomePageContainer from '../pages/HomePage/HomePage.container';
import MoviePageContainer from '../pages/MoviePage/MoviePage.container';

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route component={HomePageContainer} exact path="/" />
      <Route
        path="/movie/:id"
        render={({ match }) => <MoviePageContainer id={match.params.id} />}
      />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </Router>
);

export default App;
