import styled from 'styled-components';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import {
  useGetUpcomingQuery,
  GetUpcomingDocument,
  GetUpcomingQuery,
} from '../../__generated__';
import { ErrorMessage, Pagination, MoviesBox } from '../../components';
import { initializeApollo } from '../../apollo';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  initialData: GetUpcomingQuery;
}

export default function Upcoming({ initialData }: Props) {
  const { page } = useRouter().query as { page: string };
  const { data, error, refetch } = useGetUpcomingQuery({
    variables: { page },
    skip: Boolean(initialData),
  });

  if (error) return <ErrorMessage error={error.message} />;

  return data || initialData ? (
    <Wrapper>
      <MoviesBox
        movies={data?.upcoming.results || initialData.upcoming.results}
        title="Upcoming"
      />
      <Pagination
        path="upcoming"
        currentPage={data?.upcoming.page || initialData.upcoming.page}
        refetch={(newPage: string) => refetch({ page: newPage })}
        totalPages={
          data?.upcoming.total_pages || initialData.upcoming.total_pages
        }
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
      query: GetUpcomingDocument,
      variables: { page: params?.page },
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
    revalidate: 1,
  };
};
