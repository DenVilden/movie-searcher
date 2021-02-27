import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ErrorMessage, MovieInfo } from '../../components';
import {
  useGetTvShowInfoQuery,
  GetTvShowInfoDocument,
} from '../../__generated__';
import { initializeApollo } from '../../apollo';

export default function TvPage() {
  const { id } = useRouter().query as { id: string };

  const { data, error } = useGetTvShowInfoQuery({ variables: { id } });

  if (error) return <ErrorMessage error={error.message} />;

  return data ? <MovieInfo data={data.tvShowInfo} /> : null;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  try {
    await apolloClient.query({
      query: GetTvShowInfoDocument,
      variables: { id: params?.id },
    });
  } catch (error) {
    if (error.message.includes('404')) {
      return {
        notFound: true,
      };
    }
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
