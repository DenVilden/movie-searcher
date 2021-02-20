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

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const { data }: { data: GetUpcomingQuery } = await apolloClient.query({
    query: GetUpcomingDocument,
  });

  const paths = Array.from(
    { length: data.upcoming.total_pages },
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
    query: GetUpcomingDocument,
    variables: { page: params?.page },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
};
