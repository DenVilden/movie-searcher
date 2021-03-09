import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
} from '@material-ui/icons';
import { memo } from 'react';
import { useReactiveVar } from '@apollo/client/react';
import Image from 'next/image';
import Link from 'next/link';

import { prefersDarkModeVar } from 'apollo';
import Favorites from './Favorites';
import SearchBar from './SearchBar';

const StyledToolbar = styled(Toolbar)`
  padding-right: 4px;

  ${({ theme }) => theme.breakpoints.up('md')} {
    padding: ${({ theme }) => theme.spacing(0, 2, 0, 2)};
  }
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
            <Image
              aria-label="logo"
              css={css`
                -webkit-user-drag: none;
              `}
              height="45"
              src="/logo.svg"
              width="45"
            />
          </IconButton>
        </Link>
        <SearchBar />
        <IconButton
          aria-label="theme switch"
          css={css`
            margin-left: auto;
          `}
          onClick={toggleTheme}
        >
          {prefersDarkMode ? (
            <LightIcon />
          ) : (
            <DarkIcon
              css={css`
                color: white;
              `}
            />
          )}
        </IconButton>
        <Favorites />
      </StyledToolbar>
    </AppBar>
  );
}

export default memo(Header);
