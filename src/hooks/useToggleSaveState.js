import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFavoritesIsMovieExist } from '../selectors/favorites.selector';
import {
  addToFavorites,
  removeFromFavorites
} from '../actions/favorites.action';
import { selectMovieData } from '../selectors/movie.selector';

export default () => {
  const dispatch = useDispatch();
  const movie = useSelector(selectMovieData);
  const isExist = useSelector(selectFavoritesIsMovieExist);

  const toggleSave = useCallback(() => {
    if (isExist) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  }, [dispatch, isExist, movie]);

  return [movie, isExist, toggleSave];
};
