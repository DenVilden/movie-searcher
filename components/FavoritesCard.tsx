import styled from '@emotion/styled'
import { MenuItem, Typography } from '@material-ui/core'
import Image from 'next/image'
import Link from 'next/link'

import { Favorite } from '@/apollo/client'

const Title = styled(Typography)`
  padding-left: 15px;
  white-space: normal;
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
      <MenuItem onClick={handleToggle}>
        <Image
          alt={title}
          height={50}
          layout="fixed"
          objectFit="cover"
          src={poster_path || '/no-image.png'}
          width={50}
        />
        <Title>{title}</Title>
      </MenuItem>
    </Link>
  )
}
