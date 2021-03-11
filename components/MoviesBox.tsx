import { Grid, Typography, Paper } from '@material-ui/core';
import styled from '@emotion/styled';

import MovieCard from './MovieCard';

const Root = styled(Paper)`
  background: none;
  background-color: inherit;
  margin: ${({ theme }) => theme.spacing(11, 1, 3, 1)};
  padding: ${({ theme }) => theme.spacing(2, 0, 4, 0)};
`;

const Wrapper = styled(Grid)`
  margin-top: 10px;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    padding: ${({ theme }) => theme.spacing(0, 2, 0, 2)};
  }
`;

interface Props {
  elevation?: number;
  movies: {
    id: number;
    media_type?: string;
    poster_path?: string | null;
    release_date?: string | null;
    title: string;
    vote_average?: number;
  }[];
  title: string;
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
        {movies.map(movie => (
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
        ))}
      </Grid>
    </Root>
  );
}
