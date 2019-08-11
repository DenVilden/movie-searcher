import React from 'react';
import PropTypes from 'prop-types';
import { Slide } from '@material-ui/core';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import MoviesSimilar from '../../components/MoviesSimilar/MoviesSimilar';

const MoviePage = ({ loading }) => (
  <Slide direction="up" in={!loading}>
    <div>
      <MovieInfo />
      <MoviesSimilar />
    </div>
  </Slide>
);

MoviePage.defaultProps = {
  loading: false
};

MoviePage.propTypes = {
  loading: PropTypes.bool
};

export default MoviePage;
