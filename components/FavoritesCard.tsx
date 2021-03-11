import { CardActionArea, Typography } from '@material-ui/core';
import Image from 'next/image';
import styled from '@emotion/styled';
import Link from 'next/link';

import { Favorite } from 'apollo/client';

const CardWrapper = styled.div`
  align-items: center;
  display: flex;
  padding: ${({ theme }) => theme.spacing(1)};
  width: 250px;

  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 300px;
  }
`;

const StyledTypography = styled(Typography)`
  margin-left: 15px;
  width: 100%;
`;

const ImageWrapper = styled.div`
  height: 50px;
  position: relative;
  width: 50px;
`;

interface Props {
  favorite: Favorite;
  handleToggle: () => void;
}

export default function FavoritesCard({
  handleToggle,
  favorite: { media_type, id, title, poster_path },
}: Props) {
  return (
    <Link href={`/${media_type}/${id}`}>
      <CardActionArea onClick={handleToggle}>
        <CardWrapper>
          <ImageWrapper>
            <Image
              alt={title}
              layout="fill"
              objectFit="cover"
              src={poster_path || '/no-image.jpg'}
            />
          </ImageWrapper>
          <StyledTypography>{title}</StyledTypography>
        </CardWrapper>
      </CardActionArea>
    </Link>
  );
}
