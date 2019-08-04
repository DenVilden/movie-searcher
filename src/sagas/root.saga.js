import { all, call } from 'redux-saga/effects';
import upcomingSaga from './upcoming.saga';
import ratedSaga from './rated.saga';
import moviesSaga from './movies.saga';
import movieSaga from './movie.saga';
import similarSaga from './similar.saga';

export default function* rootSaga() {
  yield all([
    call(upcomingSaga),
    call(ratedSaga),
    call(moviesSaga),
    call(movieSaga),
    call(similarSaga)
  ]);
}
