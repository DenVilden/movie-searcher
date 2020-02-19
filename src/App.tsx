import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Header from './components/Header/Header';
import Spinner from './components/Spinner';
import {
  useGetInputValueQuery,
  useSetInputValueMutation,
} from './generated/types';

const SearchResults = lazy(() => import('./containers/SearchResults'));
const HomePage = lazy(() => import('./pages/HomePage'));
const MoviePage = lazy(() => import('./pages/MoviePage'));

const App = () => {
  const { data } = useGetInputValueQuery();
  const [setInputValue] = useSetInputValueMutation();

  if (!data) throw new Error('Not found');

  return (
    <Router>
      <Header
        inputValue={data.inputValue}
        setInputValue={value => setInputValue({ variables: { value } })}
      />
      <Suspense fallback={<Spinner />}>
        {data.inputValue && <SearchResults inputValue={data.inputValue} />}
        <Switch>
          <Route component={HomePage} exact path="/" />
          <Route component={MoviePage} path="/movie/:id" />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
