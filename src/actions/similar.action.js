/* eslint-disable import/prefer-default-export */
import {
  FETCH_SIMILAR_START,
  FETCH_SIMILAR_SUCCESS,
  FETCH_SIMILAR_FAILURE
} from '../types/similar.types';
import movieApi from '../api/movie-database';

const fetchSimilarStart = () => ({
  type: FETCH_SIMILAR_START
});

const fetchSimilarSuccess = movies => ({
  type: FETCH_SIMILAR_SUCCESS,
  payload: movies
});

const fetchSimilarFailure = errorMessage => ({
  type: FETCH_SIMILAR_FAILURE,
  payload: errorMessage
});

export const fetchSimilarMovies = id => dispatch => {
  dispatch(fetchSimilarStart());

  movieApi
    .get(`/movie/${id}/similar`)
    .then(({ data }) => dispatch(fetchSimilarSuccess(data.results)))
    .catch(({ message }) => dispatch(fetchSimilarFailure(message)));
};
