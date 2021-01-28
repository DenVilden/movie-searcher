import {
  Slide,
  LinearProgress,
  Typography,
  CardContent,
  Card,
  CardMedia,
  Divider,
  Button,
} from "@material-ui/core";
import { useRouter } from "next/router";
import styled from "styled-components";
import Head from "next/head";
import { useReactiveVar } from "@apollo/client";
import { MoviesBox, ErrorMessage } from "../../components";
import { useGetMovieInfoQuery, MovieInfo } from "../../graphql";
import withApollo, { favoritesVar } from "../../lib/apollo";
import withHeader from "../../lib/withHeader";

const StyledCard = styled(Card)`
  background-color: inherit;
  display: block;
  margin: ${(props) => props.theme.spacing(2)}px;

  ${(props) => props.theme.breakpoints.up("md")} {
    display: flex;
  }
`;

const StyledCardMedia = styled(CardMedia)`
  height: 450px;
  margin: ${(props) => props.theme.spacing(2)}px;

  ${(props) => props.theme.breakpoints.up("md")} {
    width: 40%;
  }
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${(props) => props.theme.breakpoints.up("md")} {
    width: 60%;
  }
`;

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: space-between;
`;

export const MoviePage = withHeader(() => {
  const { id } = useRouter().query as { id: string };

  const { loading, error, data } = useGetMovieInfoQuery({ variables: { id } });

  const favorites = useReactiveVar(favoritesVar);

  if (error) return <ErrorMessage error={error} />;

  if (loading || !data?.movieInfo) return <LinearProgress color="secondary" />;

  const isInFavorites = Object.values(favorites).some(
    (favorite) => favorite.id === data.movieInfo?.id
  );

  const addOrRemoveFromFavorites = () => {
    if (isInFavorites) {
      favoritesVar(
        Object.values(favorites).filter(
          (favorite) => favorite.id !== data.movieInfo?.id
        )
      );
    } else {
      favoritesVar([...favorites, data.movieInfo as MovieInfo]);
    }
  };

  return (
    <Slide direction="up" in>
      <div>
        <StyledCard elevation={10}>
          <Head>
            <title>{data.movieInfo.title}</title>
          </Head>
          <StyledCardMedia
            image={data.movieInfo.backdrop_path || "no-image.jpg"}
            src="img"
          />
          <StyledCardContent>
            <StyledTypography gutterBottom variant="h5">
              {data.movieInfo.title}
              <Button
                color={isInFavorites ? "secondary" : "primary"}
                data-testid="favorites-button"
                onClick={addOrRemoveFromFavorites}
                variant="contained"
              >
                {isInFavorites ? "Remove from favorites" : "Add to favorites"}
              </Button>
            </StyledTypography>
            <Typography>{data.movieInfo.overview}</Typography>
            <Divider />
            <Typography>
              <b>Budget:</b> {data.movieInfo.budget}
            </Typography>
            <Divider />
            <Typography>
              <b>Revenue:</b> {data.movieInfo.revenue}
            </Typography>
            <Divider />
            <Typography>
              <b>Rating:</b> {data.movieInfo.vote_average}
            </Typography>
            <Divider />
            <Typography>
              <b>Release Date:</b> {data.movieInfo.release_date}
            </Typography>
          </StyledCardContent>
        </StyledCard>
        {!!data.movieInfo.similar.results.length && (
          <MoviesBox
            movies={data.movieInfo.similar.results}
            title="Similar Movies"
          />
        )}
      </div>
    </Slide>
  );
});

export default withApollo(MoviePage);
