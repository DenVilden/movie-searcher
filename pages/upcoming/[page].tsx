import { css } from '@emotion/react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Grow from '@material-ui/core/Grow';

import {
  useGetUpcomingQuery,
  GetUpcomingDocument,
  GetUpcomingQuery,
} from '__generated__';
import ErrorMessage from 'components/ErrorMessage';
import Pagination from 'components/Pagination';
import MoviesBox from 'components/MoviesBox';
import { initializeApollo } from 'apollo';

interface Props {
  initialData: GetUpcomingQuery;
}

export default function UpcomingPage({ initialData }: Props) {
  const { page } = useRouter().query as { page: string };
  const { data, error } = useGetUpcomingQuery({
    skip: !!initialData,
    variables: { page },
  });

  if (error) return <ErrorMessage error={error.message} />;

  return data || initialData ? (
    <Grow in>
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <MoviesBox
          movies={data?.upcoming.results || initialData.upcoming.results}
          title="Upcoming"
        />
        <Pagination
          currentPage={data?.upcoming.page || initialData.upcoming.page}
          path="upcoming"
          totalPages={
            data?.upcoming.total_pages || initialData.upcoming.total_pages
          }
        />
      </div>
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
    fallback: true,
    paths,
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
