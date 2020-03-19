import React from 'react';
import { LinearProgress } from '@material-ui/core';
import ErrorMessage from './ErrorMessage';
import NotFoundMessage from '../components/NotFoundMessage/NotFoundMessage';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import { useGetMoviesSearchQuery } from '../generated/queries.generated';

type Props = {
  query: string;
};

const SearchResults = ({ query }: Props) => {
  const { loading, error, data, fetchMore } = useGetMoviesSearchQuery({
    variables: { query },
  });

  if (error) return <ErrorMessage error={error} />;

  if (loading || !data) return <LinearProgress color="secondary" />;

  if (!data?.moviesSearch.results.length) return <NotFoundMessage />;

  return (
    <MoviesBox
      elevation={0}
      hasMore={data.moviesSearch.hasMore}
      movies={data.moviesSearch.results}
      padding={0}
      showMore={() =>
        fetchMore({
          variables: { cursor: data.moviesSearch.cursor },
          updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult || prev,
        })
      }
    />
  );
};

export default SearchResults;
