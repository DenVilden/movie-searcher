import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';

import ErrorMessage from 'components/ErrorMessage';
import MovieInfo from 'components/MovieInfo';
import { useGetMovieInfoQuery, GetMovieInfoDocument } from '__generated__';
import { initializeApollo } from 'apollo';

export default function MoviePage() {
  const { id } = useRouter().query as { id: string };
  const { data, error } = useGetMovieInfoQuery({ variables: { id } });

  if (error) return <ErrorMessage error={error.message} />;

  return data ? <MovieInfo data={data.movieInfo} /> : null;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: true,
  paths: [],
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  try {
    await apolloClient.query({
      query: GetMovieInfoDocument,
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
