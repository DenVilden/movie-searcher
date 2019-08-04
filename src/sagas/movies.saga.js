import { takeLatest, call, put, all } from 'redux-saga/effects';
import { FETCH_MOVIES_START } from '../constants/movies.types';
import movieApi from '../api/movie-database';
import {
  fetchMoviesSuccess,
  fetchMoviesFailure
} from '../actions/movies.action';

function* fetchMoviesAsync({ payload: query }) {
  try {
    const { data } = yield movieApi.get('/search/movie', {
      params: { query }
    });
    yield put(fetchMoviesSuccess(data.results.length && data.results));
  } catch (error) {
    yield put(fetchMoviesFailure(error.message));
  }
}

function* fetchMoviesStart() {
  yield takeLatest(FETCH_MOVIES_START, fetchMoviesAsync);
}

export default function* moviesSaga() {
  yield all([call(fetchMoviesStart)]);
}
