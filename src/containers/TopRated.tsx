import React from 'react';
import styled from 'styled-components';
import ErrorMessage from '../components/ErrorMessage';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import { useGetTopRatedQuery } from '../__generated__';
import Pagination from '../components/Pagination/Pagination';
import Spinner from '../components/Spinner';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopRated = () => {
  const { data, loading, error, refetch, fetchMore } = useGetTopRatedQuery();

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  if (!data) throw new Error('Data not found');

  return (
    <Wrapper>
      <MoviesBox
        hasMore={data.topRated.hasMore}
        movies={data.topRated.results}
        showAll={() =>
          fetchMore({
            variables: { cursor: data.topRated.cursor },
            updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult || prev,
          })
        }
        title="Top Rated"
      />
      <Pagination
        currentPage={data.topRated.page}
        refetch={refetch}
        totalPages={data.topRated.total_pages}
      />
    </Wrapper>
  );
};

export default TopRated;
