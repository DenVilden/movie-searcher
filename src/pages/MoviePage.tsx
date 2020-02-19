import React from 'react';
import { Slide } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import MovieInfo from '../containers/MovieInfoContainer';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import { useGetMovieInfoQuery, useGetFavoritesQuery } from '../generated/types';

type Props = {
  match: { params: { id: string } };
} & RouteComponentProps;

const MoviePage = ({
  match: {
    params: { id },
  },
}: Props) => {
  const { loading, error, data } = useGetMovieInfoQuery({
    variables: { id },
  });

  const favQuery = useGetFavoritesQuery();

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
