import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import Header from './components/Header/Header';
import {
  useSetInputValueMutation,
  useGetInputValueQuery,
} from './__generated__';
import ErrorMessage from './components/ErrorMessage';

const SearchResults = lazy(() => import('./containers/SearchResults'));
const HomePage = lazy(() => import('./pages/HomePage'));
const MoviePage = lazy(() => import('./pages/MoviePage'));

const App = () => {
  const { data } = useGetInputValueQuery();
  const [setInputValue] = useSetInputValueMutation();

  if (!data) return <ErrorMessage>Data not found</ErrorMessage>;

  return (
    <Router>
      <Header
        inputValue={data.inputValue}
        setInputValue={value => setInputValue({ variables: { value } })}
      />
      <Suspense fallback={<LinearProgress color="secondary" />}>
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
