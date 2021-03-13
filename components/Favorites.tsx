import { useState, useRef, useEffect } from 'react'
import {
  Divider,
  Badge,
  Typography,
  Popover,
  IconButton,
} from '@material-ui/core'
import { useReactiveVar } from '@apollo/client'
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@material-ui/icons'
import { css } from '@emotion/react'

import { favoritesVar } from 'apollo/client'
import FavoritesCard from './FavoritesCard'

export default function Favorites() {
  const favorites = useReactiveVar(favoritesVar)
  const [toggle, setToggle] = useState(false)
  const iconButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const initialFavorites = localStorage.getItem('favorites')
    if (initialFavorites) {
      favoritesVar(JSON.parse(initialFavorites))
    }
  }, [])

  const handleToggle = () => {
    setToggle(!toggle)
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
      <Popover
        anchorEl={iconButtonRef.current}
        onClose={handleToggle}
        open={toggle}
      >
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
      </Popover>
    </>
  )
}
