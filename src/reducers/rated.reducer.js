import {
  FETCH_RATED_START,
  FETCH_RATED_SUCCESS,
  FETCH_RATED_FAILURE
} from '../types/rated.types';

const initialState = {
  data: [],
  isFetching: false,
  errorMessage: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_RATED_START:
      return { ...state, isFetching: true };

    case FETCH_RATED_SUCCESS:
      return { ...state, isFetching: false, data: payload };

    case FETCH_RATED_FAILURE:
      return { ...state, errorMessage: payload };

    default:
      return state;
  }
};
