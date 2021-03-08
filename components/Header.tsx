import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import styled from '@emotion/styled';
import DarkIcon from '@material-ui/icons/Brightness4';
import LightIcon from '@material-ui/icons/Brightness7';
import { memo } from 'react';
import { useReactiveVar } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';

import Favorites from './Favorites';
import SearchBar from './SearchBar';
import { prefersDarkModeVar } from '../apollo';

const StyledToolbar = styled(Toolbar)`
  padding-right: 4px;

  ${({ theme }) => theme.breakpoints.up('md')} {
    padding: ${({ theme }) => theme.spacing(0, 2, 0, 2)};
  }
`;

const StyledIconButton = styled(IconButton)`
  margin-left: auto;
`;

const StyledDarkIcon = styled(DarkIcon)`
  color: white;
`;

const StyledImage = styled(Image)`
  -webkit-user-drag: none;
`;

function Header() {
  const prefersDarkMode = useReactiveVar(prefersDarkModeVar);

  const toggleTheme = () => {
    const toggle = !prefersDarkMode;
    prefersDarkModeVar(toggle);
    localStorage.setItem('darkMode', JSON.stringify(toggle));
  };

  return (
    <AppBar color={prefersDarkMode ? 'inherit' : 'primary'} position="fixed">
      <StyledToolbar disableGutters>
        <Link href="/">
          <IconButton>
            <StyledImage
              aria-label="logo"
              height="45"
              src="/logo.svg"
              width="45"
            />
          </IconButton>
        </Link>
        <SearchBar />
        <StyledIconButton aria-label="theme switch" onClick={toggleTheme}>
          {prefersDarkMode ? <LightIcon /> : <StyledDarkIcon />}
        </StyledIconButton>
        <Favorites />
      </StyledToolbar>
    </AppBar>
  );
}

export default memo(Header);
