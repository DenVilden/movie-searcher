import React from 'react';
import { CardActionArea, Typography } from '@material-ui/core';
import { Star as StarIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledTypography,
  IconWrapper,
} from './MovieCard.styles';
import noImage from '../../assets/no-image.jpg';

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
  const history = useHistory();

  return (
    <StyledCard elevation={10}>
      <CardActionArea
        data-testid="card-button"
        onClick={() => history.push(`/movie/${movie.id}`)}
      >
        <StyledCardMedia
          image={movie.poster_path || noImage}
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
