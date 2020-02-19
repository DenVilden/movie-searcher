import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import FavoritesCard from '../components/FavoritesCard/FavoritesCard';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import { useGetMovieInfoQuery } from '../generated/types';

type Props = {
  clearInputValue: () => void;
  toggleFavoritesOpen: () => void;
  id: string;
} & RouteComponentProps;

const FavoritesItem = ({
  id,
  toggleFavoritesOpen,
  clearInputValue,
  history,
}: Props) => {
  const { loading, error, data } = useGetMovieInfoQuery({ variables: { id } });

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  if (!data) throw new Error('Not found');

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

export default withRouter(FavoritesItem);
