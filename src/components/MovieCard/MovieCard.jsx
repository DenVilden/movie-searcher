import React from 'react';
import PropTypes from 'prop-types';
import { CardActionArea, Typography } from '@material-ui/core';
import { Star as StarIcon } from '@material-ui/icons';
import dayjs from 'dayjs';
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledTypography,
  IconWrapper
} from './MovieCard.styles';
import noImage from '../../assets/no-image.jpg';

/* eslint-disable camelcase */
const MovieCard = ({
  id,
  title,
  poster_path,
  release_date,
  vote_average,
  text,
  history,
  clearMovies
}) => {
  const renderRating = () => {
    if (!release_date && !vote_average) {
      return 'Unknown year';
    }

    if (text === 'rating') {
      return (
        <IconWrapper>
          <StarIcon /> {vote_average}
        </IconWrapper>
      );
    }

    if (text === 'date') {
      return dayjs(release_date).format('DD MMMM YYYY');
    }

    return release_date.slice(0, 4);
  };

  return (
    <CardActionArea>
      <StyledCard
        elevation={10}
        onClick={() => {
          history.push(`/movie/${id}`);
          clearMovies();
        }}
      >
        <StyledCardMedia
          image={poster_path || noImage}
          src="img"
          title={title}
        />
        <StyledCardContent>
          <Typography variant="subtitle2">{title}</Typography>
          <StyledTypography color="textSecondary">
            {renderRating()}
          </StyledTypography>
        </StyledCardContent>
      </StyledCard>
    </CardActionArea>
  );
};

MovieCard.defaultProps = {
  poster_path: null,
  vote_average: undefined,
  release_date: undefined
};

MovieCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  release_date: PropTypes.string,
  poster_path: PropTypes.string,
  text: PropTypes.string.isRequired,
  vote_average: PropTypes.number,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  clearMovies: PropTypes.func.isRequired
};

export default MovieCard;
