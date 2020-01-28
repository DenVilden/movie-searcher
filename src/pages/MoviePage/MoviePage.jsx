import React from 'react';
import PropTypes from 'prop-types';
import { Slide } from '@material-ui/core';
import MovieInfo from '../../components/MovieInfo/MovieInfo.container';
import MoviesSimilar from '../../containers/MoviesSimilar';

const MoviePage = ({ info, similar }) => (
  <Slide direction="up" in>
    <div>
      <MovieInfo movie={info} />
      <MoviesSimilar movies={similar} />
    </div>
  </Slide>
);

MoviePage.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    budget: PropTypes.string,
    revenue: PropTypes.string,
    overview: PropTypes.string,
    backdrop_path: PropTypes.string,
    similar: PropTypes.shape({
      results: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
          release_date: PropTypes.string,
          poster_path: PropTypes.string,
        })
      ),
    }),
  }).isRequired,
  similar: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      release_date: PropTypes.string,
      poster_path: PropTypes.string,
    })
  ).isRequired,
};

export default MoviePage;
