import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Header from './components/Header/Header';
import Spinner from './components/Spinner';
import { GET_INPUT_VALUE } from './graphql/queries';
import { SET_INPUT_VALUE } from './graphql/mutations';

const SearchResults = lazy(() => import('./containers/SearchResults'));
const HomePage = lazy(() => import('./pages/HomePage'));
const MoviePage = lazy(() => import('./pages/MoviePage'));

const App = () => {
  const { data } = useQuery<{ inputValue: string }>(GET_INPUT_VALUE);
  const [setInputValue] = useMutation<
    { setInputValue: string },
    { value: string }
  >(SET_INPUT_VALUE);

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
