import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import GlobalStyle from '../styles';
import Header from '../containers/HeaderContainer';
import Spinner from '../components/Spinner';
import { GET_INPUT_VALUE } from '../graphql/queries';

const SearchResults = lazy(() =>
  import('../containers/SearchResultsContainer')
);
const HomePage = lazy(() => import('../pages/HomePage'));
const MoviePage = lazy(() => import('../pages/MoviePage'));

const App = () => {
  const {
    data: { inputValue },
  } = useQuery(GET_INPUT_VALUE);

  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Suspense fallback={<Spinner />}>
        {inputValue && <SearchResults inputValue={inputValue} />}
        <Switch>
          <Route component={HomePage} exact path="/" />
          <Route
            path="/movie/:id"
            render={({ match }) => <MoviePage id={match.params.id} />}
          />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
