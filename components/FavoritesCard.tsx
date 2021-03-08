import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from '@emotion/styled';

import { Favorite } from '../apollo';

const StyledTypography = styled(Typography)`
  padding: ${({ theme }) => theme.spacing(3, 2, 2, 2)};
`;

const CardWrapper = styled.div`
  display: flex;
  min-width: 200px;
`;

const ImageWrapper = styled.div`
  display: none;
  height: 56px;
  margin: ${({ theme }) => theme.spacing(1)};
  position: relative;
  width: 50px;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: block;
  }
`;

interface Props {
  favorite: Favorite;
  handleToggle: () => void;
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
            alt={title}
            layout="fill"
            src={poster_path || '/no-image.jpg'}
          />
        </ImageWrapper>
        <StyledTypography>{title}</StyledTypography>
      </CardWrapper>
    </CardActionArea>
  );
}
