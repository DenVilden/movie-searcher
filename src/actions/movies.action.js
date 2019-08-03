import {
  CLEAR_MOVIES,
  FETCH_MOVIES_START,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE
} from '../types/movies.types';
import movieApi from '../api/movie-database';

const fetchMoviesStart = () => ({
  type: FETCH_MOVIES_START
});

const fetchMoviesSuccess = movies => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies
});

const fetchMoviesFailure = errorMessage => ({
  type: FETCH_MOVIES_FAILURE,
  payload: errorMessage
});

export const clearMovies = () => ({
  type: CLEAR_MOVIES
});

export const fetchSearchMovies = query => dispatch => {
  dispatch(fetchMoviesStart());

  movieApi
    .get('/search/movie', { params: { query } })
    .then(({ data }) =>
      dispatch(fetchMoviesSuccess(data.results.length && data.results))
    )
    .catch(({ message }) => dispatch(fetchMoviesFailure(message)));
};
