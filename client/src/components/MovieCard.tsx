import {
  CardActionArea,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { Star as StarIcon } from "@material-ui/icons";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledCard = styled(Card)`
  height: 330px;
  text-align: center;
  width: 130px;

  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 170px;
  }
`;

const StyledCardMedia = styled(CardMedia)`
  height: 222px;
  margin: ${(props) => props.theme.spacing(1, 1, 0, 1)};
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  height: 100px;
  padding: ${(props) => props.theme.spacing(2, 1, 1, 1)};
`;

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

const IconWrapper = styled.span`
  display: flex;

  svg {
    height: 0.9em;
  }
`;

type Props = {
  movie: {
    id: number;
    title: string;
    vote_average?: number;
    poster_path?: string | null;
    release_date?: string;
  };
};

const MovieCard = ({ movie }: Props) => {
  const router = useRouter();

  return (
    <StyledCard elevation={10}>
      <CardActionArea
        data-testid="card-button"
        onClick={() =>
          router.push({ pathname: "/movie", query: { id: movie.id } })
        }
      >
        <StyledCardMedia
          image={movie.poster_path || "/no-image.jpg"}
          src="img"
          title={movie.title}
        />
        <StyledCardContent>
          <Typography variant="subtitle2">{movie.title}</Typography>
          <StyledTypography color="textSecondary">
            {movie.vote_average ? (
              <IconWrapper>
                <StarIcon /> {movie.vote_average}
              </IconWrapper>
            ) : (
              movie.release_date
            )}
          </StyledTypography>
        </StyledCardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default MovieCard;
