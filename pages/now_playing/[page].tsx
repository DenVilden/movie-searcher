import styled from '@emotion/styled';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { Grow } from '@material-ui/core';
import {
  useGetNowPlayingQuery,
  GetNowPlayingDocument,
  GetNowPlayingQuery,
} from '../../__generated__';
import ErrorMessage from '../../components/ErrorMessage';
import Pagination from '../../components/Pagination';
import MoviesBox from '../../components/MoviesBox';
import { initializeApollo } from '../../apollo';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  initialData: GetNowPlayingQuery;
}

export default function NowPlayingPage({ initialData }: Props) {
  const { page } = useRouter().query as { page: string };
  const { data, error } = useGetNowPlayingQuery({
    skip: !!initialData,
    variables: { page },
  });

  if (error) return <ErrorMessage error={error.message} />;

  return data || initialData ? (
    <Grow in>
      <Wrapper>
        <MoviesBox
          movies={data?.nowPlaying.results || initialData.nowPlaying.results}
          title="Now Playing"
        />
        <Pagination
          currentPage={data?.nowPlaying.page || initialData.nowPlaying.page}
          path="now_playing"
          totalPages={
            data?.nowPlaying.total_pages || initialData.nowPlaying.total_pages
          }
        />
      </Wrapper>
    </Grow>
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
    fallback: true,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();
  try {
    await apolloClient.query({
      query: GetNowPlayingDocument,
      variables: { page: params?.page },
    });
  } catch ({ message }) {
    if (message.includes('404') || message.includes('422')) {
      return {
        notFound: true,
      };
    }
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
};
