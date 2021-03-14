import styled from '@emotion/styled'
import { Grid, Paper, Typography } from '@material-ui/core'
import {
  NowPlayingResults,
  SimilarResults,
  UpcomingResults,
} from '~/apollo/__generated__'
import MovieCard from './MovieCard'

const Root = styled(Paper)`
  background: none;
  background-color: inherit;
  margin: ${({ theme }) => theme.spacing(11, 1, 3, 1)};
  padding: ${({ theme }) => theme.spacing(2, 0, 4, 0)};
`

const Wrapper = styled(Grid)`
  margin-top: 10px;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    padding: ${({ theme }) => theme.spacing(0, 2, 0, 2)};
  }
`

interface Props {
  elevation?: number
  movies: UpcomingResults[] | NowPlayingResults[] | SimilarResults[]
  title?: string
}

export default function MoviesBox({ movies, title, elevation = 10 }: Props) {
  return (
    <Root elevation={elevation}>
      {!!title && (
        <Typography align="center" gutterBottom variant="h4">
          {title}
        </Typography>
      )}
      <Grid container>
        {movies.map(
          (movie: UpcomingResults | NowPlayingResults | SimilarResults) => (
            <Wrapper
              key={movie.id}
              container
              item
              justifyContent="center"
              md={3}
              xs={6}
            >
              <MovieCard movie={movie} />
            </Wrapper>
          ),
        )}
      </Grid>
    </Root>
  )
}
