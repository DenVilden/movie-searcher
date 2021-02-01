import { Grid, LinearProgress } from "@material-ui/core";
import styled from "styled-components";
import { useRef } from "react";
import {
  useGetMoviesQuery,
  useGetUpcomingLazyQuery,
  useGetTopRatedLazyQuery,
} from "../graphql";
import { ErrorMessage, Pagination, MoviesBox, withHeader } from "../components";
import withApollo from "../apollo";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HomePage = withHeader(() => {
  const { data, error } = useGetMoviesQuery();
  const [
    upcomingRefetch,
    { data: upcomingData, error: upcomingError },
  ] = useGetUpcomingLazyQuery();
  const [
    topRatedRefetch,
    { data: topRatedData, error: topRatedError },
  ] = useGetTopRatedLazyQuery();

  const upcomingElement = useRef<HTMLDivElement>(null);
  const topRatedElement = useRef<HTMLDivElement>(null);

  if (error) return <ErrorMessage error={error} />;

  if (!data) return <LinearProgress color="secondary" />;

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
          <ErrorMessage error={upcomingError} />
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
          <ErrorMessage error={topRatedError} />
        )}
      </Grid>
    </Grid>
  );
});

export default withApollo(HomePage);
