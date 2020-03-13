import React, { useRef } from 'react';
import styled from 'styled-components';
import { LinearProgress } from '@material-ui/core';
import ErrorMessage from './ErrorMessage';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import { useGetUpcomingLazyQuery } from '../__generated__';
import Pagination from '../components/Pagination/Pagination';
import { Upcoming } from '../__generated__/types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type Props = {
  initialData: Upcoming;
};

const UpcomingContainer = ({ initialData }: Props) => {
  const [refetch, { data, loading, error }] = useGetUpcomingLazyQuery();

  const element = useRef<HTMLDivElement>(null!);

  if (loading) return <LinearProgress color="secondary" />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <Wrapper ref={element}>
      <MoviesBox
        movies={data?.upcoming.results || initialData.results}
        title="Upcoming"
      />
      <Pagination
        currentPage={data?.upcoming.page || initialData.page}
        refetch={refetch}
        scrollToTop={element}
        totalPages={data?.upcoming.total_pages || initialData.total_pages}
      />
    </Wrapper>
  );
};

export default UpcomingContainer;
