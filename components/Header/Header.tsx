import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import Link from 'next/link';
import styled from '@emotion/styled';
import {
  MovieFilter as MovieIcon,
  Brightness7 as LightIcon,
  Brightness4 as DarkIcon,
} from '@material-ui/icons';
import { memo } from 'react';
import { useReactiveVar } from '@apollo/client';
import { Favorites, SearchBar } from '..';
import { prefersDarkModeVar } from '../../apollo';

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

const StyledIconButton = styled(IconButton)`
  margin-left: auto;
`;

function Header() {
  const prefersDarkMode = useReactiveVar(prefersDarkModeVar);

  const toggleTheme = () => {
    const toggle = !prefersDarkMode;
    prefersDarkModeVar(toggle);
    localStorage.setItem('darkMode', JSON.stringify(toggle));
  };

  return (
    <AppBar position="static" color={prefersDarkMode ? 'inherit' : 'primary'}>
      <StyledToolbar>
        <Link href="/">
          <StyledMovieIcon />
        </Link>
        <SearchBar />
        <StyledIconButton aria-label="theme switch" onClick={toggleTheme}>
          {prefersDarkMode ? (
            <DarkIcon />
          ) : (
            <LightIcon style={{ color: 'white' }} />
          )}
        </StyledIconButton>
        <Favorites />
      </StyledToolbar>
    </AppBar>
  );
}

export default memo(Header);
