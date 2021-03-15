import { useReactiveVar } from '@apollo/client'
import { css } from '@emotion/react'
import {
  Badge,
  ClickAwayListener,
  Divider,
  IconButton,
  Paper,
  Popper,
  Typography,
} from '@material-ui/core'
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@material-ui/icons'
import { useEffect, useRef, useState } from 'react'

import { favoritesVar } from '@/apollo/client'

import FavoritesCard from './FavoritesCard'

export default function Favorites() {
  const favorites = useReactiveVar(favoritesVar)
  const [toggle, setToggle] = useState(false)
  const iconButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const initialFavorites = localStorage.getItem('favorites')
    if (initialFavorites) {
      try {
        favoritesVar(JSON.parse(initialFavorites))
      } catch (error) {
        favoritesVar([])
      }
    }
  }, [])

  const handleToggle = () => {
    setToggle(prevToggle => !prevToggle)
  }

  return (
    <>
      <IconButton
        ref={iconButtonRef}
        aria-label="open favorites"
        disabled={!favorites.length}
        onClick={handleToggle}
      >
        <Badge badgeContent={favorites.length} color="secondary">
          {toggle ? <FavoriteBorderIcon /> : <FavoriteIcon />}
        </Badge>
      </IconButton>
      <Popper
        anchorEl={iconButtonRef.current}
        disablePortal
        open={toggle}
        placement="bottom-end"
      >
        <ClickAwayListener onClickAway={handleToggle} touchEvent={false}>
          <Paper elevation={10}>
            <Typography
              css={css`
                padding-left: 10px;
              `}
              variant="overline"
            >
              Favorites
            </Typography>
            <Divider />
            {favorites.map(favorite => (
              <FavoritesCard
                key={favorite.id}
                favorite={favorite}
                handleToggle={handleToggle}
              />
            ))}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  )
}
