import {
  CardActionArea,
  LinearProgress,
  Typography,
  CardMedia,
} from "@material-ui/core";
import { useRouter } from "next/router";
import styled from "styled-components";
import ErrorMessage from "../containers/ErrorMessage";
import { useGetMovieInfoQuery } from "../graphql";

const StyledTypography = styled(Typography)`
  padding: ${(props) => props.theme.spacing(2)}px;
`;

const CardWrapper = styled.div`
  display: flex;
  min-width: 200px;
`;

const StyledCardMedia = styled(CardMedia)`
  display: none;
  height: 56px;
  margin: ${(props) => props.theme.spacing(1)}px;
  width: 50px;

  ${(props) => props.theme.breakpoints.up("sm")} {
    display: block;
  }
`;

type Props = {
  toggleFavoritesOpen: () => void;
  id: string;
};

const FavoritesCard = ({ toggleFavoritesOpen, id }: Props) => {
  const { loading, error, data } = useGetMovieInfoQuery({ variables: { id } });

  const router = useRouter();

  if (error) return <ErrorMessage error={error} />;

  if (loading || !data?.movieInfo) return <LinearProgress />;

  return (
    <CardActionArea
      data-testid="favorites-card"
      onClick={() => {
        router.push(`/movie/${id}`);
        toggleFavoritesOpen();
      }}
    >
      <CardWrapper>
        <StyledCardMedia
          image={data.movieInfo.poster_path || "/no-image.jpg"}
          src="img"
          title={data.movieInfo.title}
        />
        <StyledTypography>{data.movieInfo.title}</StyledTypography>
      </CardWrapper>
    </CardActionArea>
  );
};

export default FavoritesCard;
