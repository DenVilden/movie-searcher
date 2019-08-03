/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const selectSimilar = state => state.similar;

export const selectSimilarData = createSelector(
  selectSimilar,
  similar => similar.data
);
