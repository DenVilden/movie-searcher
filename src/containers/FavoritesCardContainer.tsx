import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import FavoritesCard from '../components/FavoritesCard/FavoritesCard';
import ErrorMessage from '../components/ErrorMessage';
import { useGetMovieInfoQuery } from '../__generated__';

type Props = {
  clearInputValue: () => void;
  toggleFavoritesOpen: () => void;
  id: string;
} & RouteComponentProps;

const FavoritesCardContainer = ({
  id,
  toggleFavoritesOpen,
  clearInputValue,
  history,
}: Props) => {
  const { loading, error, data } = useGetMovieInfoQuery({ variables: { id } });

  if (loading) return <LinearProgress />;

  if (error || !data)
    return <ErrorMessage>{error?.message || 'Data not found'}</ErrorMessage>;

  return (
    <FavoritesCard
      clearInputValue={clearInputValue}
      goTo={() => history.push(`/movie/${data.movieInfo.id}`)}
      poster={data.movieInfo.poster_path}
      title={data.movieInfo.title}
      toggleFavoritesOpen={toggleFavoritesOpen}
    />
  );
};

export default withRouter(FavoritesCardContainer);
