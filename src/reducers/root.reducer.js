import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import favoritesReducer from './favorites.reducer';
import movieReducer from './movie.reducer';
import moviesReducer from './movies.reducer';
import ratedReducer from './rated.reducer';
import upcomingReducer from './upcoming.reducer';
import similarReducer from './similar.reducer';

const persistConfig = { key: 'favorites', storage, whitelist: ['favorites'] };

const rootReducer = combineReducers({
  movie: movieReducer,
  favorites: favoritesReducer,
  movies: moviesReducer,
  rated: ratedReducer,
  upcoming: upcomingReducer,
  similar: similarReducer
});

export default persistReducer(persistConfig, rootReducer);
