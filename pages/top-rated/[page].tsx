import styled from 'styled-components';
import { useRef } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { useGetTopRatedQuery, GetTopRatedDocument } from '../../__generated__';
import { ErrorMessage, Pagination, MoviesBox } from '../../components';
import { initializeApollo } from '../../apollo';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function TopRated() {
  const { page } = useRouter().query as { page: string };
  const { data, error, refetch } = useGetTopRatedQuery({
    variables: { page: +page || 1 },
    fetchPolicy: 'network-only',
  });
  const topRatedElement = useRef<HTMLDivElement | null>(null);

  if (error) return <ErrorMessage error={error.message} />;

  return data ? (
    <Wrapper ref={topRatedElement}>
      <MoviesBox movies={data.topRated.results} title="TopRated" />
      <Pagination
        path="top-rated"
        currentPage={data.topRated.page}
        refetch={(newPage: number) => refetch({ page: newPage })}
        element={topRatedElement}
        totalPages={data.topRated.total_pages}
      />
    </Wrapper>
  ) : null;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    { params: { page: '1' } },
    { params: { page: '2' } },
    { params: { page: '3' } },
    { params: { page: '4' } },
    { params: { page: '5' } },
  ],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  try {
    await apolloClient.query({
      query: GetTopRatedDocument,
      variables: { page: +params?.page! },
    });
  } catch (error) {
    if (error.message.includes('400')) {
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
