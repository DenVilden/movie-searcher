import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import { useRef } from 'react';
import { GetStaticProps } from 'next';
import {
  useGetMoviesQuery,
  useGetUpcomingLazyQuery,
  useGetTopRatedLazyQuery,
  GetMoviesDocument,
  initializeApollo,
} from '../apollo';
import { ErrorMessage, Pagination, MoviesBox } from '../components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HomePage = () => {
  const { data, error } = useGetMoviesQuery();
  const [
    upcomingRefetch,
    { data: upcomingData, error: upcomingError },
  ] = useGetUpcomingLazyQuery();
  const [
    topRatedRefetch,
    { data: topRatedData, error: topRatedError },
  ] = useGetTopRatedLazyQuery();

  const upcomingElement = useRef<HTMLDivElement | null>(null);
  const topRatedElement = useRef<HTMLDivElement | null>(null);

  if (error || !data)
    return <ErrorMessage error={error?.message || 'No data'} />;

  return (
    <Grid container>
      <Grid item lg={6}>
        {!upcomingError ? (
          <Wrapper ref={upcomingElement}>
            <MoviesBox
              movies={upcomingData?.upcoming.results || data.upcoming.results}
              title="Upcoming"
            />
            <Pagination
              currentPage={upcomingData?.upcoming.page || data.upcoming.page}
              refetch={(page: number) =>
                upcomingRefetch({ variables: { page } })
              }
              scrollToTop={upcomingElement}
              totalPages={
                upcomingData?.upcoming.total_pages || data.upcoming.total_pages
              }
            />
          </Wrapper>
        ) : (
          <ErrorMessage error={upcomingError.message} />
        )}
      </Grid>
      <Grid item lg={6}>
        {!topRatedError ? (
          <Wrapper ref={topRatedElement}>
            <MoviesBox
              movies={topRatedData?.topRated.results || data.topRated.results}
              title="Top Rated"
            />
            <Pagination
              currentPage={topRatedData?.topRated.page || data.topRated.page}
              refetch={(page: number) =>
                topRatedRefetch({ variables: { page } })
              }
              scrollToTop={topRatedElement}
              totalPages={
                topRatedData?.topRated.total_pages || data.topRated.total_pages
              }
            />
          </Wrapper>
        ) : (
          <ErrorMessage error={topRatedError.message} />
        )}
      </Grid>
    </Grid>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GetMoviesDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default HomePage;
