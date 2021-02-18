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
import styled from 'styled-components';
import { FavoritesCard } from '..';
import { favoritesVar } from '../../apollo';

const StyledIconButton = styled(IconButton)`
  margin-left: auto;
`;

const StyledTypography = styled(Typography)`
  padding: ${(props) => props.theme.spacing(2)}px;
`;

export default function Favorites() {
  const favorites = useReactiveVar(favoritesVar);
  const [toggle, setToggle] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

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
      <StyledIconButton
        color="inherit"
        disabled={!favorites.length}
        onClick={handleToggle}
        ref={ref}
      >
        <Badge badgeContent={favorites.length} color="secondary">
          {toggle ? <FavoriteBorderIcon /> : <FavoriteIcon />}
        </Badge>
      </StyledIconButton>
      <Popover
        anchorEl={ref.current}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleToggle}
        open={toggle}
      >
        <StyledTypography variant="overline">Favorites</StyledTypography>
        <Divider />
        {favorites.map((favorite) => (
          <FavoritesCard
            handleToggle={handleToggle}
            key={favorite.id}
            favorite={favorite}
          />
        ))}
      </Popover>
    </>
  );
}
