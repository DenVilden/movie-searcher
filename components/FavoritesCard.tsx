import styled from '@emotion/styled'
import { CardActionArea, Typography } from '@material-ui/core'
import Image from 'next/image'
import Link from 'next/link'

import { Favorite } from '@/apollo/client'

const CardWrapper = styled.div`
  align-items: center;
  display: flex;
  padding: ${({ theme }) => theme.spacing(1)};
  width: 250px;

  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 300px;
  }
`

const StyledTypography = styled(Typography)`
  padding-left: 15px;
  width: 100%;
`

interface Props {
  favorite: Favorite
  handleToggle: () => void
}

export default function FavoritesCard({
  favorite: { id, media_type, poster_path, title },
  handleToggle,
}: Props) {
  return (
    <Link href={`/${media_type}/${id}`}>
      <CardActionArea onClick={handleToggle}>
        <CardWrapper>
          <Image
            alt={title}
            height={50}
            layout="fixed"
            objectFit="cover"
            src={poster_path || '/no-image.png'}
            width={50}
          />
          <StyledTypography>{title}</StyledTypography>
        </CardWrapper>
      </CardActionArea>
    </Link>
  )
}
