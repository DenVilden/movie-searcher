import { AppBar, Toolbar } from '@material-ui/core';
import Link from 'next/link';
import styled from 'styled-components';
import { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { MovieFilter as MovieIcon } from '@material-ui/icons';
import { favoritesVar, client } from '../../apollo';
import Favorites from '../Favorites/Favorites';
import SearchBar from '../SearchBar/SearchBar';

const StyledToolbar = styled(Toolbar)`
  padding: 0;

  ${(props) => props.theme.breakpoints.up('sm')} {
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const StyledMovieIcon = styled(MovieIcon)`
  cursor: pointer;
  font-size: 60px;
`;

const Header = () => {
  useEffect(() => {
    const initialFavorites = localStorage.getItem('favorites');

    if (initialFavorites) {
      favoritesVar(JSON.parse(initialFavorites));
    }
  }, []);

  return (
    <AppBar position="static">
      <StyledToolbar>
        <Link href="/">
          <StyledMovieIcon />
        </Link>
        <ApolloProvider client={client}>
          <SearchBar />
        </ApolloProvider>
        <Favorites />
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
