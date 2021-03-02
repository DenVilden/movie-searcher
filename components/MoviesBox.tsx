import { Grid, Typography, Paper } from '@material-ui/core';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import MovieCard from './MovieCard';

interface RootProps {
  padding: number;
}

const Root = styled(Paper)<RootProps>`
  background: none;
  background-color: inherit;

  ${({ theme, padding }) =>
    padding &&
    css`
      margin: ${theme.spacing(3, 1, 3, 1)};
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
  movies: {
    id: number;
    title: string;
    vote_average?: number;
    poster_path?: string | null;
    release_date?: string | null;
    media_type?: string;
  }[];
  title: string;
  elevation?: number;
  padding?: boolean;
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
