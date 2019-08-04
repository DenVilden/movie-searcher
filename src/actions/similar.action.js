import {
  FETCH_SIMILAR_START,
  FETCH_SIMILAR_SUCCESS,
  FETCH_SIMILAR_FAILURE
} from '../constants/similar.types';

export const fetchSimilarStart = id => ({
  type: FETCH_SIMILAR_START,
  payload: id
});

export const fetchSimilarSuccess = movies => ({
  type: FETCH_SIMILAR_SUCCESS,
  payload: movies
});

export const fetchSimilarFailure = error => ({
  type: FETCH_SIMILAR_FAILURE,
  payload: error
});
