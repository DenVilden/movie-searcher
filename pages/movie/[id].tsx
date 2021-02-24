import { Slide } from '@material-ui/core';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { MoviesBox, ErrorMessage, MovieInfo } from '../../components';
import {
  useGetMovieInfoQuery,
  GetMovieInfoDocument,
} from '../../__generated__';
import { initializeApollo } from '../../apollo';

export default function MoviePage() {
  const { id } = useRouter().query as { id: string };

  const { data, error } = useGetMovieInfoQuery({ variables: { id } });

  if (error) return <ErrorMessage error={error.message} />;

  return data ? (
    <>
      <Head key="title">
        <title>{data.movieInfo.title}</title>
      </Head>
      <Slide direction="up" in>
        <div>
          <MovieInfo data={data.movieInfo} />
          {!!data.movieInfo.similar.results.length && (
            <MoviesBox
              movies={data.movieInfo.similar.results}
              title="Similar Movies"
            />
          )}
        </div>
      </Slide>
    </>
  ) : null;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
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
