import { Grid, Grow, Typography } from "@material-ui/core";
import { MovieCard } from "..";
import { Root, Wrapper } from "./MoviesBox.styles";

type Props = {
  movies: {
    id: number;
    title: string;
    vote_average?: number;
    poster_path?: string | null;
    release_date?: string | null;
  }[];
  title: string;
  elevation?: number;
  padding?: number;
};

const MoviesBox = ({ movies, title, elevation = 10, padding = 1 }: Props) => (
  <Grow in>
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
            data-testid="search-result"
            item
            justify="center"
            md={3}
            xs={6}
          >
            <MovieCard movie={movie} />
          </Wrapper>
        ))}
      </Grid>
    </Root>
  </Grow>
);

export default MoviesBox;
