import React from 'react';
import { CardActionArea, Typography } from '@material-ui/core';
import { Star as StarIcon } from '@material-ui/icons';
import { useRouter } from 'next/router';
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledTypography,
  IconWrapper,
} from './MovieCard.styles';

type Props = {
  movie: {
    id: number;
    title: string;
    vote_average?: number;
    poster_path?: string | null;
    release_date?: string;
  };
};

const MovieCard = ({ movie }: Props) => {
  const router = useRouter();

  return (
    <StyledCard elevation={10}>
      <CardActionArea
        data-testid="card-button"
        onClick={() =>
          router.push({ pathname: '/movie', query: { id: movie.id } })
        }
      >
        <StyledCardMedia
          image={movie.poster_path || '/no-image.jpg'}
          src="img"
          title={movie.title}
        />
        <StyledCardContent>
          <Typography variant="subtitle2">{movie.title}</Typography>
          <StyledTypography color="textSecondary">
            {movie.vote_average ? (
              <IconWrapper>
                <StarIcon /> {movie.vote_average}
              </IconWrapper>
            ) : (
              movie.release_date
            )}
          </StyledTypography>
        </StyledCardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default MovieCard;
