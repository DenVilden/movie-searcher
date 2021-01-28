import { CardActionArea } from "@material-ui/core";
import { useRouter } from "next/router";
import { MovieInfo } from "../../graphql";
import {
  StyledTypography,
  CardWrapper,
  StyledCardMedia,
} from "./FavoritesCard.styles";

type Props = {
  handleToggle: () => void;
  favorite: MovieInfo;
};

const FavoritesCard = ({ handleToggle, favorite }: Props) => {
  const router = useRouter();

  return (
    <CardActionArea
      data-testid="favorites-card"
      onClick={() => {
        router.push(`/movie/${favorite.id}`);
        handleToggle();
      }}
    >
      <CardWrapper>
        <StyledCardMedia
          image={favorite.poster_path || "/no-image.jpg"}
          src="img"
          title={favorite.title}
        />
        <StyledTypography>{favorite.title}</StyledTypography>
      </CardWrapper>
    </CardActionArea>
  );
};

export default FavoritesCard;
