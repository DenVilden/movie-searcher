import React from 'react';
import { CardActionArea } from '@material-ui/core';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  return (
    <CardActionArea
      data-testid="favorites-card"
      onClick={() => {
        router.push('/movie/[id]', `/movie/${movie.id}`);
        toggleFavoritesOpen();
      }}
    >
      <CardWrapper>
        <StyledCardMedia
          image={movie.poster_path || '/no-image.jpg'}
          src="img"
          title={movie.title}
        />
        <StyledTypography>{movie.title}</StyledTypography>
      </CardWrapper>
    </CardActionArea>
  );
};

export default FavoritesCard;
