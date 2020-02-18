import React from 'react';
import { CardActionArea, Typography } from '@material-ui/core';
import { Star as StarIcon } from '@material-ui/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledTypography,
  IconWrapper,
} from './MovieCard.styles';
import noImage from '../../assets/no-image.jpg';
import GetMovies from '../../types/GetMovie';

type Props = {
  movie: GetMovies;
  clearInputValue?: () => void;
} & RouteComponentProps;

/* eslint-disable camelcase */
const MovieCard = ({
  movie: { id, title, poster_path, release_date, vote_average },
  clearInputValue,
  history,
}: Props) => (
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

export default withRouter(MovieCard);
