import React from 'react';
import PropTypes from 'prop-types';
import { CardActionArea, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
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
  history,
  vote_average,
  text
}) => {
  const renderRating = () => {
    if (!release_date) {
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
      <StyledCard elevation={10} onClick={() => history.push(`/movie/${id}`)}>
        <StyledCardMedia
          image={
            poster_path
              ? `https://image.tmdb.org/t/p/w200${poster_path}`
              : noImage
          }
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
  poster_path: null
};

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  poster_path: PropTypes.string,
  text: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withRouter(MovieCard);
