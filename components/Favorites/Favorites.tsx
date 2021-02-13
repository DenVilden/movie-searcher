import { useState } from 'react';
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

const Favorites = () => {
  const favorites = useReactiveVar(favoritesVar);
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <StyledIconButton
        color="inherit"
        data-testid="icon-button"
        disabled={!favorites.length}
        onClick={handleToggle}
      >
        <Badge badgeContent={favorites.length} color="secondary">
          {toggle ? <FavoriteBorderIcon /> : <FavoriteIcon />}
        </Badge>
      </StyledIconButton>
      <Popover
        anchorReference="anchorEl"
        anchorOrigin={{ vertical: 45, horizontal: 'right' }}
        data-testid="dropdown"
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
};

export default Favorites;
