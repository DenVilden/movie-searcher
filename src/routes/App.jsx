import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalStyle from './App.styles';
import Header from '../components/Header/Header.container';
import Spinner from '../components/Spinner/Spinner';

const SearchResults = lazy(() =>
  import('../components/SearchResults/SearchResults.container')
);
const HomePage = lazy(() => import('../pages/HomePage/HomePage.container'));
const MoviePage = lazy(() => import('../pages/MoviePage/MoviePage.container'));

const App = ({ inputValue }) => (
  <Router>
    <GlobalStyle />
    <Header />
    <Suspense fallback={<Spinner />}>
      {inputValue && <SearchResults inputValue={inputValue} />}
      <Switch>
        <Route component={HomePage} exact path="/" />
        <Route
          render={({ match }) => <MoviePage id={match.params.id} />}
          path="/movie/:id"
        />
      </Switch>
    </Suspense>
  </Router>
);

App.propTypes = {
  inputValue: PropTypes.string.isRequired,
};

export default App;
