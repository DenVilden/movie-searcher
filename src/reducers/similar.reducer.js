import {
  FETCH_SIMILAR_START,
  FETCH_SIMILAR_SUCCESS,
  FETCH_SIMILAR_FAILURE
} from '../types/similar.types';

const initialState = {
  data: [],
  isFetching: false,
  errorMessage: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_SIMILAR_START:
      return { ...state, isFetching: true };

    case FETCH_SIMILAR_SUCCESS:
      return { ...state, isFetching: false, data: payload };

    case FETCH_SIMILAR_FAILURE:
      return { ...state, errorMessage: payload };

    default:
      return state;
  }
};
