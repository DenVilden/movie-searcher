import React from 'react';
import { useSelector } from 'react-redux';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import WithSpinner from '../WithSpinner/WithSpinner';
import { selectMoviesData } from '../../selectors/movies.selector';
import { StyledTypography } from './MoviesSearch.styles';

const MoviesSearch = () => {
  const movies = useSelector(selectMoviesData);

  return (
    <>
      {movies ? (
        <MoviesContainer elevation={0} movies={movies.slice(0, 6)} />
      ) : (
        <StyledTypography
          align="center"
          color="error"
          gutterBottom
          variant="h6"
        >
          Nothing found
        </StyledTypography>
      )}
    </>
  );
};

export default WithSpinner(MoviesSearch);
