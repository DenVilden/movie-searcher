import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default (actionOne, actionTwo, state) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionOne(state));

    if (actionTwo) {
      dispatch(actionTwo(state));
    }
  }, [dispatch, actionOne, actionTwo, state]);
};
