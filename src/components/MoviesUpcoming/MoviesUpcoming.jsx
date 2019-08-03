import React from 'react';
import { useSelector } from 'react-redux';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import { selectUpcomingSortByReleaseDate } from '../../selectors/upcoming.selector';

const MoviesUpcoming = () => {
  const movies = useSelector(selectUpcomingSortByReleaseDate);

  return (
    <MoviesContainer
      elevation={10}
      movies={movies.slice(0, 12)}
      padding={1}
      text="date"
      title="Upcoming"
    />
  );
};

export default MoviesUpcoming;
