import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Slide } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import { GET_MOVIE_INFO, GET_FAVORITES } from '../graphql/queries';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import MovieInfo from '../containers/MovieInfoContainer';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import {
  GetMovieInfo,
  GetMovieInfoVariables,
} from '../graphql/__generated__/GetMovieInfo';
import { GetFavorites } from '../graphql/__generated__/GetFavorites';

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

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  if (!data || !favQuery.data) throw new Error('Not found');

  return (
    <Slide direction="up" in>
      <div>
        <MovieInfo id={id} movie={data.movieInfo} />
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
