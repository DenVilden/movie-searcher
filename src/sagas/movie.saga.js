import { takeLatest, call, put, all } from 'redux-saga/effects';
import { FETCH_MOVIE_START } from '../constants/movie.types';
import movieApi from '../api/movie-database';
import { fetchMovieSuccess, fetchMovieFailure } from '../actions/movie.action';

function* fetchMovieAsync({ payload: id }) {
  try {
    const { data } = yield movieApi.get(`/movie/${id}`);
    yield put(fetchMovieSuccess(data));
  } catch (error) {
    yield put(fetchMovieFailure(error.message));
  }
}

function* fetchMovieStart() {
  yield takeLatest(FETCH_MOVIE_START, fetchMovieAsync);
}

export default function* movieSaga() {
  yield all([call(fetchMovieStart)]);
}
