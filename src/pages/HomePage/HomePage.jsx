import React from 'react';
import PropTypes from 'prop-types';
import MoviesUpcoming from '../../components/MoviesUpcoming/MoviesUpcoming';
import MoviesTopRated from '../../components/MoviesTopRated/MoviesTopRated';

const HomePage = ({ upcoming, topRated }) => (
  <main>
    <MoviesUpcoming movies={upcoming} />
    <MoviesTopRated movies={topRated} />
  </main>
);

HomePage.defaultProps = {
  upcoming: [],
  topRated: [],
};

HomePage.propTypes = {
  upcoming: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      release_date: PropTypes.string,
      poster_path: PropTypes.string,
    })
  ),
  topRated: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      release_date: PropTypes.string,
      vote_average: PropTypes.number,
    })
  ),
};

export default HomePage;
