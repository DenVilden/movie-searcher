import { css } from '@emotion/react'
import { MenuItem, Typography } from '@material-ui/core'
import Image from 'next/image'
import Link from 'next/link'

import { Favorite } from '@/apollo/client'

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
      <MenuItem
        css={css`
          min-width: 250px;
          white-space: normal;
        `}
        onClick={handleToggle}
      >
        <Image
          alt={title}
          height={40}
          layout="fixed"
          objectFit="cover"
          src={poster_path || '/no-image.png'}
          width={40}
        />
        <Typography
          css={css`
            padding-left: 15px;
          `}
        >
          {title}
        </Typography>
      </MenuItem>
    </Link>
  )
}
