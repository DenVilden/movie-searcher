import React, { useRef } from 'react';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';
import MoviesBox from '../components/MoviesBox';
import { useGetUpcomingLazyQuery } from '../generated/queries.generated';
import Pagination from '../components/Pagination';
import { Upcoming } from '../generated/types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type Props = {
  initialData: Upcoming;
};

const UpcomingContainer = ({ initialData }: Props) => {
  const [refetch, { data, error }] = useGetUpcomingLazyQuery();

  const element = useRef<HTMLDivElement>(null!);

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
