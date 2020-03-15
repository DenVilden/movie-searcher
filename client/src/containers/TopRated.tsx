import React, { useRef } from 'react';
import styled from 'styled-components';
import { LinearProgress } from '@material-ui/core';
import ErrorMessage from './ErrorMessage';
import MoviesBox from '../components/MoviesBox/MoviesBox';
import { useGetTopRatedLazyQuery } from '../generated/queries.generated';
import Pagination from '../components/Pagination/Pagination';
import { TopRated } from '../generated/types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type Props = {
  initialData: TopRated;
};

const TopRatedContainer = ({ initialData }: Props) => {
  const [refetch, { data, loading, error }] = useGetTopRatedLazyQuery();

  const element = useRef<HTMLDivElement>(null!);

  if (loading) return <LinearProgress color="secondary" />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <Wrapper ref={element}>
      <MoviesBox
        movies={data?.topRated.results || initialData.results}
        title="Top Rated"
      />
      <Pagination
        currentPage={data?.topRated.page || initialData.page}
        refetch={refetch}
        scrollToTop={element}
        totalPages={data?.topRated.total_pages || initialData.total_pages}
      />
    </Wrapper>
  );
};

export default TopRatedContainer;
