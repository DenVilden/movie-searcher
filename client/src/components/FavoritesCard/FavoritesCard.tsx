import { CardActionArea, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import { MovieInfo } from "../../apollo";

const StyledTypography = styled(Typography)`
  padding: ${(props) => props.theme.spacing(3, 2, 2, 2)};
`;

const CardWrapper = styled.div`
  display: flex;
  min-width: 200px;
`;

const ImageWrapper = styled("div")`
  display: none;
  height: 56px;
  margin: ${(props) => props.theme.spacing(1)}px;
  position: relative;
  width: 50px;

  ${(props) => props.theme.breakpoints.up("sm")} {
    display: block;
  }
`;

interface Props {
  handleToggle: () => void;
  favorite: MovieInfo;
}

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
        <ImageWrapper>
          <Image
            layout="fill"
            alt={favorite.title}
            src={favorite.poster_path || "/no-image.jpg"}
          />
        </ImageWrapper>
        <StyledTypography>{favorite.title}</StyledTypography>
      </CardWrapper>
    </CardActionArea>
  );
};

export default FavoritesCard;
