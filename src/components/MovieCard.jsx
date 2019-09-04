import React from 'react';
import PropTypes from 'prop-types';
import {
  CardActionArea,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@material-ui/core';
import { Star as StarIcon } from '@material-ui/icons';
import styled from 'styled-components';
import noImage from '../assets/no-image.jpg';

/* eslint-disable camelcase */
const MovieCard = ({
  movie: { id, title, poster_path, release_date, vote_average },
  clearInputValue,
  history,
}) => (
  <CardActionArea
    onClick={() => {
      history.push(`/movie/${id}`);
      clearInputValue();
    }}
  >
    <StyledCard elevation={10}>
      <StyledCardMedia image={poster_path || noImage} src="img" title={title} />
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

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
  clearInputValue: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

// STYLES
const StyledCard = styled(Card)`
  height: 330px;
  text-align: center;
  width: 130px;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    width: 170px;
  }
`;

const StyledCardMedia = styled(CardMedia)`
  height: 200px;
  margin: ${({ theme }) => theme.spacing(1, 1, 0, 1)};
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  height: 100px;
`;

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

const IconWrapper = styled.span`
  display: flex;
`;

export default MovieCard;
