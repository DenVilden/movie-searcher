import { css } from '@emotion/react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Grow } from '@material-ui/core';

import {
  useGetUpcomingQuery,
  GetUpcomingDocument,
  GetUpcomingQuery,
} from 'apollo/__generated__';
import ErrorMessage from 'components/ErrorMessage';
import Pagination from 'components/Pagination';
import MoviesBox from 'components/MoviesBox';
import { initializeApollo, addApolloState } from 'apollo/client';

interface Props {
  initialData: GetUpcomingQuery;
  page?: string;
}

export default function UpcomingPage({ initialData, page }: Props) {
  const { data, error } = useGetUpcomingQuery({
    skip: !page,
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const { page } = params as { page: string };

  try {
    await apolloClient.query<GetUpcomingQuery>({
      query: GetUpcomingDocument,
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

  const { data } = await apolloClient.query<GetUpcomingQuery>({
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
