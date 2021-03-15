import { useReactiveVar } from '@apollo/client'
import { css } from '@emotion/react'
import { AppBar, IconButton, Toolbar } from '@material-ui/core'
import {
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
} from '@material-ui/icons'
import Link from 'next/link'

import { prefersDarkModeVar } from '@/apollo/client'

import Favorites from './Favorites'
import Logo from './Logo'
import SearchBar from './SearchBar'

export default function Header() {
  const prefersDarkMode = useReactiveVar(prefersDarkModeVar)

  const toggleTheme = () => {
    const toggle = !prefersDarkMode
    prefersDarkModeVar(toggle)
    localStorage.setItem('darkMode', JSON.stringify(toggle))
  }

  return (
    <AppBar color="inherit" position="fixed">
      <Toolbar
        css={css`
          padding: 0 4px;
        `}
      >
        <Link href="/">
          <IconButton aria-label="go to home page">
            <Logo prefersDarkMode={prefersDarkMode} />
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
          {prefersDarkMode ? <LightIcon /> : <DarkIcon />}
        </IconButton>
        <Favorites />
      </Toolbar>
    </AppBar>
  )
}
