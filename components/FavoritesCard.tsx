import styled from '@emotion/styled'
import { MenuItem, Typography } from '@material-ui/core'
import Image from 'next/image'
import Link from 'next/link'

import { Favorite } from '@/apollo/client'

const Title = styled(Typography)`
  padding-left: ${({ theme }) => theme.spacing(2)};
  white-space: normal;
  width: 100%;
`

interface Props {
  favorite: Favorite
  handleToggle: () => void
}

export default function FavoritesCard({ favorite, handleToggle }: Props) {
  return (
    <Link href={`/${favorite.media_type}/${favorite.id}`}>
      <MenuItem onClick={handleToggle}>
        <Image
          alt={favorite.title}
          height={50}
          layout="fixed"
          objectFit="cover"
          src={favorite.poster_path || '/no-image.png'}
          width={50}
        />
        <Title>{favorite.title}</Title>
      </MenuItem>
    </Link>
  )
}
