import { takeLatest, call, put, all } from 'redux-saga/effects';
import { FETCH_UPCOMING_START } from '../constants/upcoming.types';
import movieApi from '../api/movie-database';
import {
  fetchUpcomingSuccess,
  fetchUpcomingFailure
} from '../actions/upcoming.action';

function* fetchUpcomingAsync() {
  try {
    const { data } = yield movieApi.get('/movie/upcoming');
    yield put(fetchUpcomingSuccess(data.results));
  } catch (error) {
    yield put(fetchUpcomingFailure(error.message));
  }
}

function* fetchUpcomingStart() {
  yield takeLatest(FETCH_UPCOMING_START, fetchUpcomingAsync);
}

export default function* upcomingSaga() {
  yield all([call(fetchUpcomingStart)]);
}
