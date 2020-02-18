import React from 'react';
import { CardActionArea, Divider } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  StyledPopover,
  StyledTypography,
  CardWrapper,
  StyledCardMedia,
} from './FavoritesDropdown.styles';
import noImage from '../../assets/no-image.jpg';
import GetMovieInfo from '../../types/GetMovieInfo';

type Props = {
  clearInputValue: () => void;
  open: boolean;
  toggleFavoritesOpen: () => void;
  favorites: GetMovieInfo[];
} & RouteComponentProps;

const FavoritesDropdown = ({
  favorites,
  clearInputValue,
  history,
  open,
  toggleFavoritesOpen,
}: Props) => (
  <StyledPopover
    anchorReference="none"
    onClose={toggleFavoritesOpen}
    open={open}
  >
    <StyledTypography variant="overline">Favorites</StyledTypography>
    <Divider />
    {/* eslint-disable camelcase */}
    {favorites.map(({ id, poster_path, title }) => (
      <CardActionArea
        key={id}
        onClick={() => {
          history.push(`/movie/${id}`);
          clearInputValue();
          toggleFavoritesOpen();
        }}
      >
        <CardWrapper>
          <StyledCardMedia
            image={poster_path || noImage}
            src="img"
            title={title}
          />
          <StyledTypography>{title}</StyledTypography>
        </CardWrapper>
      </CardActionArea>
    ))}
  </StyledPopover>
);

export default withRouter(FavoritesDropdown);
