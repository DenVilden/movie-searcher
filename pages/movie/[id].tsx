import { Slide } from '@material-ui/core';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { MoviesBox, ErrorMessage, MovieInfo } from '../../components';
import {
  useGetMovieInfoQuery,
  GetMovieInfoDocument,
  initializeApollo,
} from '../../apollo';

const MoviePage = () => {
  const { id } = useRouter().query as { id: string };

  const { error, data } = useGetMovieInfoQuery({ variables: { id } });

  if (error || !data)
    return <ErrorMessage error={error?.message || 'No data'} />;

  return (
    <Slide direction="up" in>
      <div>
        <MovieInfo data={data} />
        {Boolean(data.movieInfo.similar.results.length) && (
          <MoviesBox
            movies={data.movieInfo.similar.results}
            title="Similar Movies"
          />
        )}
      </div>
    </Slide>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GetMovieInfoDocument,
    variables: { id: params?.id },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default MoviePage;
