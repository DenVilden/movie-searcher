import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMoviesStart, clearMovies } from '../actions/movies.action';

export default (inputValue = '') => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(inputValue);

  const handleChange = useCallback(
    evt => {
      setValue(evt.target.value);

      if (evt.target.value) {
        dispatch(fetchMoviesStart(evt.target.value));
      }
    },
    [dispatch]
  );

  const clearState = useCallback(() => {
    setValue('');
    dispatch(clearMovies());
  }, [dispatch]);

  return [value, handleChange, clearState];
};
