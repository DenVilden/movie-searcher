import React, { useRef } from 'react';
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
  const { data, loading, error, refetch } = useGetTopRatedQuery();

  const element = useRef<HTMLElement>(null!);

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  if (!data) throw new Error('Data not found');

  const scrollToTop = () => {
    element.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <Wrapper ref={element as any}>
      <MoviesBox movies={data.topRated.results} title="Top Rated" />
      <Pagination
        currentPage={data.topRated.page}
        refetch={refetch}
        scrollToTop={scrollToTop}
        totalPages={data.topRated.total_pages}
      />
    </Wrapper>
  );
};

export default TopRated;
