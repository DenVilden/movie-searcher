import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Grow, Typography, Paper } from '@material-ui/core';
import styled from 'styled-components';
import MovieCard from '../containers/MovieCardContainer';

const MoviesContainer = ({ movies, title, elevation, padding }) => (
  <Root elevation={elevation} padding={padding}>
    {title && (
      <Typography align="center" gutterBottom variant="h4">
        {title}
      </Typography>
    )}
    <List container>
      {movies.map(movie => (
        <Grow key={movie.id} in>
          <Grid item lg={2} md={3} sm={4} xs={6}>
            <Wrapper container justify="center">
              <Grid item>
                <MovieCard movie={movie} />
              </Grid>
            </Wrapper>
          </Grid>
        </Grow>
      ))}
    </List>
  </Root>
);

MoviesContainer.defaultProps = {
  title: '',
  elevation: 1,
  padding: 0,
};

MoviesContainer.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.any).isRequired,
  title: PropTypes.string,
  elevation: PropTypes.number,
  padding: PropTypes.number,
};

export default MoviesContainer;

/* STYLES */
const Root = styled(Paper)`
  background: none;
  background-color: inherit;
  margin: ${({ theme, padding }) => padding && theme.spacing(2)}px;
  padding: ${({ theme, padding }) => padding && theme.spacing(2, 0, 4, 0)};
`;

const List = styled(Grid)`
  flex-grow: 1;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    padding: ${({ theme }) => theme.spacing(0, 2, 0, 2)};
  }
`;

const Wrapper = styled(Grid)`
  margin-top: 10px;
`;
