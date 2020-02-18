import React, { lazy } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Slide } from '@material-ui/core';
import { GET_MOVIE_INFO, GET_FAVORITES_DATA } from '../graphql/queries';
import Spinner from '../components/Spinner';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from '../graphql/mutations';
import GetMovieInfo from '../types/GetMovieInfo';

const ErrorMessage = lazy(() => import('../components/ErrorMessage'));

type Props = {
  match: { params: { id: string } };
};

const MoviePage = ({ match }: Props) => {
  const { loading, error, data } = useQuery<{ movieInfo: GetMovieInfo }>(
    GET_MOVIE_INFO,
    {
      variables: { id: match.params.id },
    }
  );
  const favQuery = useQuery<{ favorites: GetMovieInfo[] }>(GET_FAVORITES_DATA);
  const [addToFavorites] = useMutation<
    { addToFavorites: GetMovieInfo[] },
    { movie: GetMovieInfo }
  >(ADD_TO_FAVORITES);
  const [removeFromFavorites] = useMutation<
    { removeFromFavorites: GetMovieInfo[] },
    { movie: GetMovieInfo }
  >(REMOVE_FROM_FAVORITES);

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  if (!data || !favQuery.data) throw new Error('Not found');

  const isExist = favQuery.data.favorites.some(
    favorite => favorite.id === data.movieInfo.id
  );

  const toggleSave = () => {
    if (isExist) {
      removeFromFavorites({ variables: { movie: data.movieInfo } });
    } else {
      addToFavorites({ variables: { movie: data.movieInfo } });
    }
  };

  return (
    <Slide direction="up" in>
      <div>
        <MovieInfo
          isExist={isExist !== undefined ? isExist : false}
          movie={data.movieInfo}
          toggleSave={toggleSave}
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
