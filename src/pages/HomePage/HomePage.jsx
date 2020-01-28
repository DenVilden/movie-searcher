import React from 'react';
import PropTypes from 'prop-types';
import MoviesUpcoming from '../../containers/MoviesUpcoming';
import MoviesTopRated from '../../containers/MoviesTopRated';

const HomePage = ({ upcoming, topRated }) => (
  <main>
    <MoviesUpcoming movies={upcoming} />
    <MoviesTopRated movies={topRated} />
  </main>
);

HomePage.propTypes = {
  upcoming: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      poster_path: PropTypes.string,
      title: PropTypes.string,
      release_date: PropTypes.string,
    })
  ).isRequired,
  topRated: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      poster_path: PropTypes.string,
      title: PropTypes.string,
      vote_average: PropTypes.number,
    })
  ).isRequired,
};

export default HomePage;
