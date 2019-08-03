/* eslint-disable import/prefer-default-export */
import {
  FETCH_UPCOMING_START,
  FETCH_UPCOMING_SUCCESS,
  FETCH_UPCOMING_FAILURE
} from '../types/upcoming.types';
import movieApi from '../api/movie-database';

const fetchUpcomingStart = () => ({
  type: FETCH_UPCOMING_START
});

const fetchUpcomingSuccess = movies => ({
  type: FETCH_UPCOMING_SUCCESS,
  payload: movies
});

const fetchUpcomingFailure = errorMessage => ({
  type: FETCH_UPCOMING_FAILURE,
  payload: errorMessage
});

export const fetchUpcomingMovies = () => dispatch => {
  dispatch(fetchUpcomingStart());

  movieApi
    .get('/movie/upcoming')
    .then(({ data }) => dispatch(fetchUpcomingSuccess(data.results)))
    .catch(({ message }) => dispatch(fetchUpcomingFailure(message)));
};
