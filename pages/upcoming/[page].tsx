import styled from '@emotion/styled';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { Grow } from '@material-ui/core';
import {
  useGetUpcomingQuery,
  GetUpcomingDocument,
  GetUpcomingQuery,
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
  initialData: GetUpcomingQuery;
}

export default function UpcomingPage({ initialData }: Props) {
  const { page } = useRouter().query as { page: string };
  const { data, error } = useGetUpcomingQuery({
    variables: { page },
    skip: !!initialData,
  });

  if (error) return <ErrorMessage error={error.message} />;

  return data || initialData ? (
    <Grow in>
      <Wrapper>
        <MoviesBox
          movies={data?.upcoming.results || initialData.upcoming.results}
          title="Upcoming"
        />
        <Pagination
          path="upcoming"
          currentPage={data?.upcoming.page || initialData.upcoming.page}
          totalPages={
            data?.upcoming.total_pages || initialData.upcoming.total_pages
          }
        />
      </Wrapper>
    </Grow>
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
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  try {
    await apolloClient.query({
      query: GetUpcomingDocument,
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
