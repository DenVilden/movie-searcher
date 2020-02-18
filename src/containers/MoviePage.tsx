import React, { lazy } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Slide } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import { GET_MOVIE_INFO, GET_FAVORITES } from '../graphql/queries';
import Spinner from '../components/Spinner';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import { ADD_OR_REMOVE_FROM_FAVORITES } from '../graphql/mutations';
import {
  AddOrRemoveFromFavorites,
  AddOrRemoveFromFavoritesVariables,
} from '../graphql/__generated__/AddOrRemoveFromFavorites';
import {
  GetMovieInfo,
  GetMovieInfoVariables,
} from '../graphql/__generated__/GetMovieInfo';
import { GetFavorites } from '../graphql/__generated__/GetFavorites';

const ErrorMessage = lazy(() => import('../components/ErrorMessage'));

type Props = {
  match: { params: { id: string } };
} & RouteComponentProps;

const MoviePage = ({
  match: {
    params: { id },
  },
}: Props) => {
  const { loading, error, data } = useQuery<
    GetMovieInfo,
    GetMovieInfoVariables
  >(GET_MOVIE_INFO, {
    variables: { id },
  });

  const favQuery = useQuery<GetFavorites>(GET_FAVORITES);

  const [addOrRemoveFromFavorites] = useMutation<
    AddOrRemoveFromFavorites,
    AddOrRemoveFromFavoritesVariables
  >(ADD_OR_REMOVE_FROM_FAVORITES, { variables: { movieId: id } });

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  if (!data || !favQuery.data) throw new Error('Not found');

  const isExist = favQuery.data.favorites.includes(id);

  return (
    <Slide direction="up" in>
      <div>
        <MovieInfo
          isExist={isExist}
          movie={data.movieInfo}
          toggleSave={addOrRemoveFromFavorites}
        />
        {data.movieInfo.similar.results.length && (
          <MoviesBox
            movies={data.movieInfo.similar.results}
            title="Similar Movies"
          />
        )}
      </div>
    </Slide>
  );
};

export default MoviePage;
