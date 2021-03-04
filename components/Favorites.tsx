import { useState, useRef, useEffect } from 'react';
import {
  Divider,
  Badge,
  Typography,
  Popover,
  IconButton,
} from '@material-ui/core';
import { useReactiveVar } from '@apollo/client';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@material-ui/icons';
import styled from '@emotion/styled';
import FavoritesCard from './FavoritesCard';
import { favoritesVar } from '../apollo';

const StyledTypography = styled(Typography)`
  padding: ${({ theme }) => theme.spacing(2)};
`;

export default function Favorites() {
  const favorites = useReactiveVar(favoritesVar);
  const [toggle, setToggle] = useState(false);
  const iconButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const initialFavorites = localStorage.getItem('favorites');
    if (initialFavorites) {
      favoritesVar(JSON.parse(initialFavorites));
    }
  }, []);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <IconButton
        ref={iconButtonRef}
        aria-label="open favorites"
        color="inherit"
        disabled={!favorites.length}
        onClick={handleToggle}
      >
        <Badge badgeContent={favorites.length} color="secondary">
          {toggle ? <FavoriteBorderIcon /> : <FavoriteIcon />}
        </Badge>
      </IconButton>
      <Popover
        anchorEl={iconButtonRef.current}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        onClose={handleToggle}
        open={toggle}
      >
        <StyledTypography variant="overline">Favorites</StyledTypography>
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
  );
}
