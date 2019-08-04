import { takeLatest, call, put, all } from 'redux-saga/effects';
import { FETCH_MOVIES_START } from '../constants/movies.types';
import { FETCH_MOVIE_START } from '../constants/movie.types';
import movieApi from '../api/movie-database';
import {
  fetchMoviesSuccess,
  fetchMoviesFailure,
  clearMovies
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

function* clearSearchBarOnMovieLoad() {
  yield put(clearMovies());
}

function* fetchMoviesStart() {
  yield takeLatest(FETCH_MOVIES_START, fetchMoviesAsync);
}

function* onMovieInfoLoad() {
  yield takeLatest(FETCH_MOVIE_START, clearSearchBarOnMovieLoad);
}

export default function* moviesSaga() {
  yield all([call(fetchMoviesStart), call(onMovieInfoLoad)]);
}
