import { takeLatest, call, put, all } from 'redux-saga/effects';
import { FETCH_SIMILAR_START } from '../constants/similar.types';
import movieApi from '../api/movie-database';
import {
  fetchSimilarSuccess,
  fetchSimilarFailure
} from '../actions/similar.action';

function* fetchSimilarAsync({ payload: id }) {
  try {
    const { data } = yield movieApi.get(`/movie/${id}/similar`);
    yield put(fetchSimilarSuccess(data.results.length && data.results));
  } catch (error) {
    yield put(fetchSimilarFailure(error.message));
  }
}

function* fetchSimilarStart() {
  yield takeLatest(FETCH_SIMILAR_START, fetchSimilarAsync);
}

export default function* similarSaga() {
  yield all([call(fetchSimilarStart)]);
}
