import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { CardActionArea, Typography } from '@material-ui/core';
import { Star as StarIcon } from '@material-ui/icons';
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
  history,
  clearInputValue
}) => {
  const goTo = useCallback(() => {
    history.push(`/movie/${id}`);
    clearInputValue();
  }, [clearInputValue, history, id]);

  return (
    <CardActionArea>
      <StyledCard elevation={10} onClick={goTo}>
        <StyledCardMedia
          image={poster_path || noImage}
          src="img"
          title={title}
        />
        <StyledCardContent>
          <Typography variant="subtitle2">{title}</Typography>
          <StyledTypography color="textSecondary">
            {vote_average ? (
              <IconWrapper>
                <StarIcon /> {vote_average}
              </IconWrapper>
            ) : (
              release_date || 'Unknown year'
            )}
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
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  release_date: PropTypes.string,
  poster_path: PropTypes.string,
  vote_average: PropTypes.number,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  clearInputValue: PropTypes.func.isRequired
};

export default MovieCard;
