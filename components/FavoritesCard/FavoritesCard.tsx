import { CardActionArea, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from '@emotion/styled';
import { Favorite } from '../../apollo';

const StyledTypography = styled(Typography)`
  padding: ${(props) => props.theme.spacing(3, 2, 2, 2)};
`;

const CardWrapper = styled.div`
  display: flex;
  min-width: 200px;
`;

const ImageWrapper = styled.div`
  display: none;
  height: 56px;
  margin: ${(props) => props.theme.spacing(1)};
  position: relative;
  width: 50px;

  ${(props) => props.theme.breakpoints.up('sm')} {
    display: block;
  }
`;

interface Props {
  handleToggle: () => void;
  favorite: Favorite;
}

export default function FavoritesCard({
  handleToggle,
  favorite: { media_type, id, title, poster_path },
}: Props) {
  const router = useRouter();

  return (
    <CardActionArea
      onClick={() => {
        router.push(`/${media_type}/${id}`);
        handleToggle();
      }}
    >
      <CardWrapper>
        <ImageWrapper>
          <Image
            layout="fill"
            alt={title}
            src={poster_path || '/no-image.jpg'}
          />
        </ImageWrapper>
        <StyledTypography>{title}</StyledTypography>
      </CardWrapper>
    </CardActionArea>
  );
}
