import styled from 'styled-components';
import { useRef } from 'react';
import { LinearProgress } from '@material-ui/core';
import { useGetTopRatedLazyQuery, GetTopRatedQuery } from '../../apollo';
import { ErrorMessage, Pagination, MoviesBox } from '..';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  initialData: GetTopRatedQuery;
}

const TopRated = ({ initialData }: Props) => {
  const [fetchTopRated, { data, error, loading }] = useGetTopRatedLazyQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });
  const topRatedElement = useRef<HTMLDivElement | null>(null);

  if (error) return <ErrorMessage error={error.message} />;

  if (loading) return <LinearProgress color="secondary" />;

  return (
    <Wrapper ref={topRatedElement}>
      <MoviesBox
        movies={data?.topRated.results || initialData.topRated.results}
        title="TopRated"
      />
      <Pagination
        currentPage={data?.topRated.page || initialData.topRated.page}
        refetch={(page: number) => fetchTopRated({ variables: { page } })}
        element={topRatedElement}
        totalPages={
          data?.topRated.total_pages || initialData.topRated.total_pages
        }
      />
    </Wrapper>
  );
};

export default TopRated;
