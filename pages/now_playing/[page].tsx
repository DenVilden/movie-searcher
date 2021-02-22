import styled from 'styled-components';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import {
  useGetNowPlayingQuery,
  GetNowPlayingDocument,
  GetNowPlayingQuery,
} from '../../__generated__';
import { ErrorMessage, Pagination, MoviesBox } from '../../components';
import { initializeApollo } from '../../apollo';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  initialData: GetNowPlayingQuery;
}

export default function NowPlaying({ initialData }: Props) {
  const { page } = useRouter().query as { page: string };
  const { data, error, refetch } = useGetNowPlayingQuery({
    variables: { page },
    skip: !!initialData,
  });

  if (error) return <ErrorMessage error={error.message} />;

  return data || initialData ? (
    <Wrapper>
      <MoviesBox
        movies={data?.nowPlaying.results || initialData.nowPlaying.results}
        title="Now Playing"
      />
      <Pagination
        path="now_playing"
        currentPage={data?.nowPlaying.page || initialData.nowPlaying.page}
        refetch={(newPage: string) => refetch({ page: newPage })}
        totalPages={
          data?.nowPlaying.total_pages || initialData.nowPlaying.total_pages
        }
      />
    </Wrapper>
  ) : null;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const { data }: { data: GetNowPlayingQuery } = await apolloClient.query({
    query: GetNowPlayingDocument,
  });

  const paths = Array.from(
    { length: data.nowPlaying.total_pages },
    (_, page) => ({
      params: { page: (page + 1).toString() },
    }),
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GetNowPlayingDocument,
    variables: { page: params?.page },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
};
