import React from 'react';
import styled from 'styled-components';
import ErrorMessage from '../components/ErrorMessage';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import { useGetUpcomingQuery } from '../__generated__';
import Pagination from '../components/Pagination/Pagination';
import Spinner from '../components/Spinner';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Upcoming = () => {
  const { data, loading, error, refetch, fetchMore } = useGetUpcomingQuery();

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  if (!data) throw new Error('Data not found');

  return (
    <Wrapper>
      <MoviesBox
        hasMore={data.upcoming.hasMore}
        movies={data.upcoming.results}
        showAll={() =>
          fetchMore({
            variables: { cursor: data.upcoming.cursor },
            updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult || prev,
          })
        }
        title="Upcoming"
      />
      <Pagination
        currentPage={data.upcoming.page}
        refetch={refetch}
        totalPages={data.upcoming.total_pages}
      />
    </Wrapper>
  );
};

export default Upcoming;
