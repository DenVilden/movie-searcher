import { Grid } from '@material-ui/core';
import { GetStaticProps } from 'next';
import Upcoming from './upcoming/[page]';
import TopRated from './top-rated/[page]';
import { useGetMoviesQuery, GetMoviesDocument } from '../__generated__';
import { initializeApollo } from '../apollo';
import { ErrorMessage } from '../components';

export default function HomePage() {
  const { data, error } = useGetMoviesQuery({ variables: { page: 1 } });

  if (error) return <ErrorMessage error={error.message} />;

  return data ? (
    <Grid container>
      <Grid item lg={6}>
        <Upcoming initialData={{ upcoming: data.upcoming }} />
      </Grid>
      <Grid item lg={6}>
        <TopRated initialData={{ topRated: data.topRated }} />
      </Grid>
    </Grid>
  ) : null;
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GetMoviesDocument,
    variables: { page: 1 },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
};
