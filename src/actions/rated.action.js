/* eslint-disable import/prefer-default-export */
import {
  FETCH_RATED_START,
  FETCH_RATED_SUCCESS,
  FETCH_RATED_FAILURE
} from '../types/rated.types';
import movieApi from '../api/movie-database';

const fetchRatedStart = () => ({
  type: FETCH_RATED_START
});

const fetchRatedSuccess = movies => ({
  type: FETCH_RATED_SUCCESS,
  payload: movies
});

const fetchRatedFailure = errorMessage => ({
  type: FETCH_RATED_FAILURE,
  payload: errorMessage
});

export const fetchTopRatedMovies = () => dispatch => {
  dispatch(fetchRatedStart());

  movieApi
    .get('/movie/top_rated')
    .then(({ data }) => dispatch(fetchRatedSuccess(data.results)))
    .catch(({ message }) => dispatch(fetchRatedFailure(message)));
};
