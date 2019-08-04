import { takeLatest, call, put, all } from 'redux-saga/effects';
import { FETCH_RATED_START } from '../constants/rated.types';
import movieApi from '../api/movie-database';
import { fetchRatedSuccess, fetchRatedFailure } from '../actions/rated.action';

function* fetchRatedAsync() {
  try {
    const { data } = yield movieApi.get('/movie/top_rated');
    yield put(fetchRatedSuccess(data.results));
  } catch (error) {
    yield put(fetchRatedFailure(error.message));
  }
}

function* fetchRatedStart() {
  yield takeLatest(FETCH_RATED_START, fetchRatedAsync);
}

export default function* ratedSaga() {
  yield all([call(fetchRatedStart)]);
}
