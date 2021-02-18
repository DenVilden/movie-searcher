import { AppBar, Toolbar } from '@material-ui/core';
import Link from 'next/link';
import styled from 'styled-components';
import { MovieFilter as MovieIcon } from '@material-ui/icons';
import { memo } from 'react';
import { Favorites, SearchBar } from '..';

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

function Header() {
  return (
    <AppBar position="static">
      <StyledToolbar>
        <Link href="/">
          <StyledMovieIcon />
        </Link>
        <SearchBar />
        <Favorites />
      </StyledToolbar>
    </AppBar>
  );
}

export default memo(Header);
