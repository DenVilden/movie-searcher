import React, { lazy } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import FavoritesCard from '../components/FavoritesCard/FavoritesCard';
import { GET_MOVIE_INFO } from '../graphql/queries';
import Spinner from '../components/Spinner';
import {
  GetMovieInfo,
  GetMovieInfoVariables,
} from '../graphql/__generated__/GetMovieInfo';

const ErrorMessage = lazy(() => import('../components/ErrorMessage'));

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
  const { loading, error, data } = useQuery<
    GetMovieInfo,
    GetMovieInfoVariables
  >(GET_MOVIE_INFO, { variables: { id } });

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
