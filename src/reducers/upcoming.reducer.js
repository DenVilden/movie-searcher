import {
  FETCH_UPCOMING_START,
  FETCH_UPCOMING_SUCCESS,
  FETCH_UPCOMING_FAILURE
} from '../types/upcoming.types';

const initialState = {
  data: [],
  isFetching: false,
  errorMessage: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_UPCOMING_START:
      return { ...state, isFetching: true };

    case FETCH_UPCOMING_SUCCESS:
      return { ...state, isFetching: false, data: payload };

    case FETCH_UPCOMING_FAILURE:
      return { ...state, errorMessage: payload };

    default:
      return state;
  }
};
