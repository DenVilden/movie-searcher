import React from 'react';
import { LinearProgress } from '@material-ui/core';
import FavoritesCard from '../components/FavoritesCard/FavoritesCard';
import ErrorMessage from './ErrorMessage';
import { useGetMovieInfoQuery } from '../__generated__';

type Props = {
  toggleFavoritesOpen: () => void;
  id: string;
};

const FavoritesItem = ({ id, toggleFavoritesOpen }: Props) => {
  const { loading, error, data } = useGetMovieInfoQuery({ variables: { id } });

  if (loading) return <LinearProgress />;

  if (error || !data)
    return <ErrorMessage>{error?.message || 'No data found'}</ErrorMessage>;

  return (
    <FavoritesCard
      movie={data.movieInfo}
      toggleFavoritesOpen={toggleFavoritesOpen}
    />
  );
};

export default FavoritesItem;
