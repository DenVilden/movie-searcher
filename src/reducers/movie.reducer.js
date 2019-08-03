import {
  FETCH_MOVIE_START,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILURE
} from '../types/movie.types';

const initialState = {
  data: [],
  isFetching: false,
  errorMessage: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_MOVIE_START:
      return { ...state, isFetching: true };

    case FETCH_MOVIE_SUCCESS:
      return { ...state, isFetching: false, data: payload };

    case FETCH_MOVIE_FAILURE:
      return { ...state, errorMessage: payload };

    default:
      return state;
  }
};
