import React from 'react';
import { Slide, LinearProgress } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import {
  useGetMovieInfoQuery,
  useAddOrRemoveFromFavoritesMutation,
  GetMovieInfoDocument,
} from '../__generated__';

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

  const [addOrRemoveFromFavorites] = useAddOrRemoveFromFavoritesMutation({
    variables: { id },
    refetchQueries: [{ query: GetMovieInfoDocument, variables: { id } }],
  });

  if (loading) return <LinearProgress color="secondary" />;

  if (error || !data)
    return <ErrorMessage>{error?.message || 'Data not found'}</ErrorMessage>;

  return (
    <Slide direction="up" in>
      <div>
        <MovieInfo
          movie={data.movieInfo}
          toggleSave={addOrRemoveFromFavorites}
        />
        {data.movieInfo.similar.results.length ? (
          <MoviesBox
            movies={data.movieInfo.similar.results}
            title="Similar Movies"
          />
        ) : null}
      </div>
    </Slide>
  );
};

export default MoviePage;
