import React from 'react';
import { CardActionArea } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import noImage from '../../assets/no-image.jpg';
import {
  StyledTypography,
  CardWrapper,
  StyledCardMedia,
} from './FavoritesCard.styles';
import { MovieInfo } from '../../__generated__/types';

type Props = {
  toggleFavoritesOpen: () => void;
  movie: MovieInfo;
};

const FavoritesCard = ({ toggleFavoritesOpen, movie }: Props) => {
  const history = useHistory();

  return (
    <CardActionArea
      data-testid="favorites-card"
      onClick={() => {
        history.push(`/movie/${movie.id}`);
        toggleFavoritesOpen();
      }}
    >
      <CardWrapper>
        <StyledCardMedia
          image={movie.poster_path || noImage}
          src="img"
          title={movie.title}
        />
        <StyledTypography>{movie.title}</StyledTypography>
      </CardWrapper>
    </CardActionArea>
  );
};

export default FavoritesCard;
