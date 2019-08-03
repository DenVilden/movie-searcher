import {
  FETCH_MOVIES_START,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  CLEAR_MOVIES
} from '../types/movies.types';

const initialState = {
  data: [],
  isFetching: false,
  errorMessage: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_MOVIES_START:
      return { ...state, isFetching: true };

    case FETCH_MOVIES_SUCCESS:
      return { ...state, isFetching: false, data: payload };

    case FETCH_MOVIES_FAILURE:
      return { ...state, errorMessage: payload };

    case CLEAR_MOVIES:
      return { ...state, isFetching: false, data: [] };

    default:
      return state;
  }
};
