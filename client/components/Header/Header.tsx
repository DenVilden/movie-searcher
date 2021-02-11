import { AppBar, Toolbar } from '@material-ui/core';
import Link from 'next/link';
import styled from 'styled-components';
import { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
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

const StyledImg = styled.img`
  cursor: pointer;
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
          <StyledImg alt="logo" src="/logo.svg" />
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
