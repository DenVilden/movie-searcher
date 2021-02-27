import { Grid, Typography, Paper, PaperProps } from '@material-ui/core';
import styled from '@emotion/styled';
import { MovieCard } from '..';

interface RootProps extends PaperProps {
  padding: number;
}

const Root = styled((props: RootProps) => <Paper {...props} />)`
  background: none;
  background-color: inherit;
  margin: ${(props) => props.padding && props.theme.spacing(3, 1, 3, 1)};
  padding: ${(props) => props.padding && props.theme.spacing(2, 0, 4, 0)};
`;

const Wrapper = styled(Grid)`
  margin-top: 10px;

  ${(props) => props.theme.breakpoints.up('sm')} {
    padding: ${(props) => props.theme.spacing(0, 2, 0, 2)};
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
  padding?: number;
}

export default function MoviesBox({
  movies,
  title,
  elevation = 10,
  padding = 1,
}: Props) {
  return (
    <Root elevation={elevation} padding={padding}>
      {!!title && (
        <Typography align="center" gutterBottom variant="h4">
          {title}
        </Typography>
      )}
      <Grid container>
        {movies.map((movie) => (
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
