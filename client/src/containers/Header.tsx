import React, { Suspense, lazy } from 'react';
import { AppBar, Toolbar, LinearProgress } from '@material-ui/core';
import {
  useGetInputValueQuery,
  useSetInputValueMutation,
} from '../__generated__';
import Favorites from './Favorites';
import Logo from '../components/Logo/Logo';
import SearchBar from '../components/SearchBar/SearchBar';

const SearchResults = lazy(() => import('./SearchResults'));

const Header = () => {
  const { data } = useGetInputValueQuery();
  const [setInputValue] = useSetInputValueMutation();

  if (!data) throw new Error('No data found');

  return (
    <Suspense fallback={<LinearProgress color="secondary" />}>
      <AppBar position="static">
        <Toolbar>
          <Logo />
          <SearchBar
            inputValue={data.inputValue}
            setInputValue={value => setInputValue({ variables: { value } })}
          />
          <Favorites />
        </Toolbar>
      </AppBar>
      {data.inputValue && <SearchResults query={data.inputValue} />}
    </Suspense>
  );
};

export default Header;
