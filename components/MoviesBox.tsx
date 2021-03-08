import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import MovieCard from './MovieCard';

const Root = styled(Paper)<{ padding: number }>`
  background: none;
  background-color: inherit;

  ${({ theme, padding }) =>
    padding &&
    css`
      margin: ${theme.spacing(11, 1, 3, 1)};
      padding: ${theme.spacing(2, 0, 4, 0)};
    `};
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
  padding?: boolean;
  title: string;
}

export default function MoviesBox({
  movies,
  title,
  elevation = 10,
  padding = true,
}: Props) {
  return (
    <Root elevation={elevation} padding={+padding}>
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
