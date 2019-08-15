import React from 'react';
import PropTypes from 'prop-types';
import MoviesUpcoming from '../../components/MoviesUpcoming/MoviesUpcoming';
import MoviesTopRated from '../../components/MoviesTopRated/MoviesTopRated';

const HomePage = ({ movies }) => {
  return Object.values(movies).length ? (
    <>
      <MoviesUpcoming movies={movies.upcoming} />
      <MoviesTopRated movies={movies.topRated} />
    </>
  ) : null;
};

HomePage.propTypes = {
  movies: PropTypes.shape({
    upcoming: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        release_date: PropTypes.string,
        poster_path: PropTypes.string
      })
    ),
    topRated: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        release_date: PropTypes.string,
        vote_average: PropTypes.number
      })
    )
  }).isRequired
};

export default HomePage;
