import React from 'react';
import { Slide } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import MovieInfo from '../containers/MovieInfoContainer';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import { useGetMovieInfoQuery } from '../__generated__';

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

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  if (!data) throw new Error('Data Not found');

  return (
    <Slide direction="up" in>
      <div>
        <MovieInfo
          id={id}
          isInFavorites={data.movieInfo.isInFavorites}
          movie={data.movieInfo.results}
        />
        {data.movieInfo.similar_results.length && (
          <MoviesBox
            movies={data.movieInfo.similar_results}
            title="Similar Movies"
          />
        )}
      </div>
    </Slide>
  );
};

export default MoviePage;
