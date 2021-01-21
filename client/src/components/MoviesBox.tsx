import { Grid, Grow, Typography, Paper } from "@material-ui/core";
import styled, { DefaultTheme } from "styled-components";
import MovieCard from "./MovieCard";

const Root = styled(Paper)`
  background: none;
  background-color: inherit;
  margin: ${(props: { padding: number; theme: DefaultTheme }) =>
    props.padding && props.theme.spacing(3, 1, 3, 1)};
  padding: ${(props: { padding: number; theme: DefaultTheme }) =>
    props.padding && props.theme.spacing(2, 0, 4, 0)};
`;

const Wrapper = styled(Grid)`
  margin-top: 10px;

  ${(props) => props.theme.breakpoints.up("sm")} {
    padding: ${(props) => props.theme.spacing(0, 2, 0, 2)};
  }
`;

const defaultProps = {
  title: "",
  elevation: 10,
  padding: 1,
};

type Props = {
  movies: {
    id: number;
    title: string;
    vote_average?: number;
    poster_path?: string | null;
    release_date?: string;
  }[];
} & typeof defaultProps;

const MoviesBox = ({ movies, title, elevation, padding }: Props) => (
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

MoviesBox.defaultProps = defaultProps;

export default MoviesBox;
