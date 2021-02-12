import styled from 'styled-components';
import { useRef } from 'react';
import { LinearProgress } from '@material-ui/core';
import { useGetUpcomingLazyQuery, GetUpcomingQuery } from '../../apollo';
import { ErrorMessage, Pagination, MoviesBox } from '..';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  initialData: GetUpcomingQuery;
}

const Upcoming = ({ initialData }: Props) => {
  const [fetchUpcoming, { data, error, loading }] = useGetUpcomingLazyQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });
  const upcomingElement = useRef<HTMLDivElement | null>(null);

  if (error) return <ErrorMessage error={error.message} />;

  if (loading) return <LinearProgress color="secondary" />;

  return (
    <Wrapper ref={upcomingElement}>
      <MoviesBox
        movies={data?.upcoming.results || initialData.upcoming.results}
        title="Upcoming"
      />
      <Pagination
        currentPage={data?.upcoming.page || initialData.upcoming.page}
        refetch={(page: number) => fetchUpcoming({ variables: { page } })}
        element={upcomingElement}
        totalPages={
          data?.upcoming.total_pages || initialData.upcoming.total_pages
        }
      />
    </Wrapper>
  );
};

export default Upcoming;
