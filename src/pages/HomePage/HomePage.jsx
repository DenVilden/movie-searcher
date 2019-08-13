import React from 'react';
import PropTypes from 'prop-types';
import MoviesUpcoming from '../../components/MoviesUpcoming/MoviesUpcoming';
import MoviesTopRated from '../../components/MoviesTopRated/MoviesTopRated';

const HomePage = ({ upcoming, topRated }) => (
  <>
    <MoviesUpcoming movies={upcoming} />
    <MoviesTopRated movies={topRated} />
  </>
);

HomePage.propTypes = {
  upcoming: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      release_date: PropTypes.string,
      poster_path: PropTypes.string
    })
  ).isRequired,
  topRated: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      release_date: PropTypes.string,
      vote_average: PropTypes.number
    })
  ).isRequired
};

export default HomePage;
