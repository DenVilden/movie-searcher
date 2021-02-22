import { Slide } from '@material-ui/core';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { MoviesBox, ErrorMessage, MovieInfo } from '../../components';
import {
  useGetTvShowInfoQuery,
  GetTvShowInfoDocument,
} from '../../__generated__';
import { initializeApollo } from '../../apollo';

export default function Tv() {
  const { id } = useRouter().query as { id: string };

  const { data, error } = useGetTvShowInfoQuery({ variables: { id } });

  if (error) return <ErrorMessage error={error.message} />;

  return data ? (
    <>
      <Head key="title">
        <title>{data.tvShowInfo.title}</title>
      </Head>
      <Slide direction="up" in>
        <div>
          <MovieInfo data={data.tvShowInfo} />
          {!!data.tvShowInfo.similar.results.length && (
            <MoviesBox
              movies={data.tvShowInfo.similar.results}
              title="Similar TV Shows"
            />
          )}
        </div>
      </Slide>
    </>
  ) : null;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
