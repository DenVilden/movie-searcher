import React from 'react';
import PropTypes from 'prop-types';
import { CardActionArea, Typography } from '@material-ui/core';
import { Star as StarIcon } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledTypography,
  IconWrapper,
} from './MovieCard.styles';
import noImage from '../../assets/no-image.jpg';

const propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
  clearInputValue: PropTypes.func,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

const defaultProps = {
  clearInputValue: null,
};

/* eslint-disable camelcase */
const MovieCard = ({
  movie: { id, title, poster_path, release_date, vote_average },
  clearInputValue,
  history,
}) => (
  <StyledCard elevation={10}>
    <CardActionArea
      onClick={() => {
        history.push(`/movie/${id}`);
        clearInputValue && clearInputValue();
      }}
    >
      <StyledCardMedia image={poster_path || noImage} src="img" title={title} />
      <StyledCardContent>
        <Typography variant="subtitle2">{title}</Typography>
        <StyledTypography color="textSecondary">
          {vote_average ? (
            <IconWrapper>
              <StarIcon /> {vote_average}
            </IconWrapper>
          ) : (
            release_date
          )}
        </StyledTypography>
      </StyledCardContent>
    </CardActionArea>
  </StyledCard>
);
MovieCard.defaultProps = defaultProps;
MovieCard.propTypes = propTypes;

export default withRouter(MovieCard);
