import { CardActionArea, Typography } from '@material-ui/core';
import Image from 'next/image';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';

import { Favorite } from 'apollo/client';

const CardWrapper = styled.div`
  align-items: center;
  display: flex;
  min-width: 200px;
  padding: ${({ theme }) => theme.spacing(1)};
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
          <Image
            alt={title}
            height="50"
            src={poster_path || '/no-image.jpg'}
            width="50"
          />
          <Typography
            css={css`
              margin-left: 15px;
            `}
          >
            {title}
          </Typography>
        </CardWrapper>
      </CardActionArea>
    </Link>
  );
}
