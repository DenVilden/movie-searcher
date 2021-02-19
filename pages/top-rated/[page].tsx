import styled from 'styled-components';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import {
  useGetTopRatedQuery,
  GetTopRatedDocument,
  GetTopRatedQuery,
} from '../../__generated__';
import { ErrorMessage, Pagination, MoviesBox } from '../../components';
import { initializeApollo } from '../../apollo';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  initialData: GetTopRatedQuery;
}

export default function TopRated({ initialData }: Props) {
  const { page } = useRouter().query as { page: string };
  const { data, error, refetch } = useGetTopRatedQuery({
    variables: { page: +page },
    skip: Boolean(initialData),
  });

  if (error) return <ErrorMessage error={error.message} />;

  return data || initialData ? (
    <Wrapper>
      <MoviesBox
        movies={data?.topRated.results || initialData.topRated.results}
        title="TopRated"
      />
      <Pagination
        path="top-rated"
        currentPage={data?.topRated.page || initialData.topRated.page}
        refetch={(newPage: number) => refetch({ page: newPage })}
        totalPages={
          data?.topRated.total_pages || initialData.topRated.total_pages
        }
      />
    </Wrapper>
  ) : null;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
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
