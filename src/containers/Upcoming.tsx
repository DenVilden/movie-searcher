import React, { useRef } from 'react';
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
  const { data, loading, error, refetch } = useGetUpcomingQuery();

  const element = useRef<HTMLDivElement>(null!);

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  if (!data) throw new Error('Data not found');

  return (
    <Wrapper ref={element}>
      <MoviesBox movies={data.upcoming.results} title="Upcoming" />
      <Pagination
        currentPage={data.upcoming.page}
        refetch={refetch}
        scrollToTop={element}
        totalPages={data.upcoming.total_pages}
      />
    </Wrapper>
  );
};

export default Upcoming;
