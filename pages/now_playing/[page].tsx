import { GetStaticProps, GetStaticPaths } from 'next';

import {
  useGetNowPlayingQuery,
  GetNowPlayingDocument,
  GetNowPlayingQuery,
} from 'apollo/__generated__';
import ErrorMessage from 'components/ErrorMessage';
import { initializeApollo, addApolloState } from 'apollo/client';
import MoviesLayout from 'components/MoviesLayout';

interface Props {
  initialData: GetNowPlayingQuery;
  page?: string;
}

export default function NowPlayingPage({ initialData, page }: Props) {
  const { data, error } = useGetNowPlayingQuery({
    skip: !page,
    variables: { page },
  });

  if (error) return <ErrorMessage error={error.message} />;

  return data || initialData ? (
    <MoviesLayout
      data={data?.nowPlaying || initialData.nowPlaying}
      path="now_playing"
      title="Now Playing"
    />
  ) : null;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const { page } = params as { page: string };

  try {
    await apolloClient.query<GetNowPlayingQuery>({
      query: GetNowPlayingDocument,
      variables: { page },
    });
  } catch ({ message }) {
    if (message.includes('404') || message.includes('422')) {
      return {
        notFound: true,
      };
    }
  }

  return addApolloState(apolloClient, {
    props: {
      page,
    },
    revalidate: 10,
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<GetNowPlayingQuery>({
    query: GetNowPlayingDocument,
  });

  const paths = Array.from(
    { length: data.nowPlaying.total_pages },
    (_, page) => ({
      params: { page: (page + 1).toString() },
    }),
  );

  return {
    fallback: true,
    paths,
  };
};
