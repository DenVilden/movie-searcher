import { GetStaticPaths, GetStaticProps } from 'next';

import ErrorMessage from 'components/ErrorMessage';
import MovieInfo from 'components/MovieInfo';
import {
  useGetTvShowInfoQuery,
  GetTvShowInfoDocument,
  GetTvShowInfoQuery,
} from 'apollo/__generated__';
import { initializeApollo, addApolloState } from 'apollo/client';

export default function TvPage({ id }: { id: string }) {
  const { data, error } = useGetTvShowInfoQuery({ variables: { id } });

  if (error) return <ErrorMessage error={error.message} />;

  return data ? <MovieInfo data={data.tvShowInfo} /> : null;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: true,
  paths: [],
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const { id } = params as { id: string };

  try {
    await apolloClient.query<GetTvShowInfoQuery>({
      query: GetTvShowInfoDocument,
      variables: { id },
    });
  } catch (error) {
    if (error.message.includes('404')) {
      return {
        notFound: true,
      };
    }
  }

  return addApolloState(apolloClient, {
    props: {
      id,
    },
  });
};
