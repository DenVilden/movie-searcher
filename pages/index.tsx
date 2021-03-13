import { Grid } from '@material-ui/core'
import { GetStaticProps } from 'next'
import ErrorMessage from 'components/ErrorMessage'
import { initializeApollo, addApolloState } from 'apollo/client'
import {
  useGetMoviesQuery,
  GetMoviesDocument,
  GetMoviesQuery,
} from 'apollo/__generated__'
import MoviesLayout from 'components/MoviesLayout'

export default function HomePage() {
  const { data, error } = useGetMoviesQuery()

  if (error || !data)
    return <ErrorMessage error={error?.message || 'No data'} />

  return (
    <Grid container>
      <Grid item lg={6}>
        <MoviesLayout
          data={data.nowPlaying}
          path="now_playing"
          title="Now Playing"
        />
      </Grid>
      <Grid item lg={6}>
        <MoviesLayout data={data.upcoming} path="upcoming" title="Upcoming" />
      </Grid>
    </Grid>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()

  await apolloClient.query<GetMoviesQuery>({
    query: GetMoviesDocument,
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 10,
  })
}
