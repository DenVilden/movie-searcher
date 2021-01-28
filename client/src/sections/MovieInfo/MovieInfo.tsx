import { Typography, Divider, Button } from "@material-ui/core";
import Head from "next/head";
import { useReactiveVar } from "@apollo/client";
import { MovieInfo as MovieInfoType } from "../../graphql";
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledTypography,
} from "./MovieInfo.styles";
import { favoritesVar } from "../../lib/apollo";

type Props = {
  movie: MovieInfoType;
};

const MovieInfo = ({ movie }: Props) => {
  const favorites = useReactiveVar(favoritesVar);

  const isInFavorites = Object.values(favorites).some(
    (favorite) => favorite.id === movie.id
  );

  const addOrRemoveFromFavorites = () => {
    if (isInFavorites) {
      favoritesVar(
        Object.values(favorites).filter((favorite) => favorite.id !== movie.id)
      );
    } else {
      favoritesVar([...favorites, movie]);
    }
  };

  return (
    <StyledCard elevation={10}>
      <Head>
        <title>{movie.title}</title>
      </Head>
      <StyledCardMedia
        image={movie.backdrop_path || "no-image.jpg"}
        src="img"
      />
      <StyledCardContent>
        <StyledTypography gutterBottom variant="h5">
          {movie.title}
          <Button
            color={isInFavorites ? "secondary" : "primary"}
            data-testid="favorites-button"
            onClick={addOrRemoveFromFavorites}
            variant="contained"
          >
            {isInFavorites ? "Remove from favorites" : "Add to favorites"}
          </Button>
        </StyledTypography>
        <Typography>{movie.overview}</Typography>
        <Divider />
        <Typography>
          <b>Budget:</b> {movie.budget}
        </Typography>
        <Divider />
        <Typography>
          <b>Revenue:</b> {movie.revenue}
        </Typography>
        <Divider />
        <Typography>
          <b>Rating:</b> {movie.vote_average}
        </Typography>
        <Divider />
        <Typography>
          <b>Release Date:</b> {movie.release_date}
        </Typography>
      </StyledCardContent>
    </StyledCard>
  );
};

export default MovieInfo;
