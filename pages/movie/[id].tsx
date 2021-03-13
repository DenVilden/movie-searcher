import { GetStaticProps, GetStaticPaths } from 'next'
import ErrorMessage from 'components/ErrorMessage'
import MovieInfo from 'components/MovieInfo'
import {
  useGetMovieInfoQuery,
  GetMovieInfoDocument,
  GetMovieInfoQuery,
} from 'apollo/__generated__'
import { initializeApollo, addApolloState } from 'apollo/client'

export default function MoviePage({ id }: { id: string }) {
  const { data, error } = useGetMovieInfoQuery({ variables: { id } })

  if (error || !data)
    return <ErrorMessage error={error?.message || 'No data'} />

  return <MovieInfo data={data.movieInfo} />
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  const { id } = params as { id: string }

  try {
    await apolloClient.query<GetMovieInfoQuery>({
      query: GetMovieInfoDocument,
      variables: { id },
    })
  } catch (error) {
    if (error.message.includes('404')) {
      return {
        notFound: true,
      }
    }
  }

  return addApolloState(apolloClient, {
    props: {
      id,
    },
  })
}

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: true,
  paths: [],
})
