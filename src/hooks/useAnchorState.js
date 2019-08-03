import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toggleFavoritesOpen } from '../actions/favorites.action';

export default (inputValue = null) => {
  const dispatch = useDispatch();
  const [anchor, setAnchor] = useState(inputValue);

  const handleClick = useCallback(
    evt => {
      setAnchor(evt.currentTarget);
      dispatch(toggleFavoritesOpen());
    },
    [dispatch]
  );

  const handleClose = useCallback(() => {
    setAnchor(null);
    dispatch(toggleFavoritesOpen());
  }, [dispatch]);

  return [anchor, handleClick, handleClose];
};
