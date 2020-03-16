import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { useSetInputValueMutation } from '../generated/mutations.generated';
import { useGetInputValueQuery } from '../generated/queries.generated';
import Favorites from './Favorites';
import Logo from '../components/Logo/Logo';
import SearchBar from '../components/SearchBar/SearchBar';
import SearchResults from './SearchResults';

const Header = () => {
  const { data } = useGetInputValueQuery();
  const [setInputValue] = useSetInputValueMutation();

  return data ? (
    <>
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
    </>
  ) : null;
};

export default Header;
