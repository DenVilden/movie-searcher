import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from '@material-ui/core';
import { Star as StarIcon } from '@material-ui/icons';
import Image from 'next/image';
import styled from '@emotion/styled';
import Link from 'next/link';

const CardContainer = styled(Card)`
  width: 150px;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    width: 170px;
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    width: 190px;
  }
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  height: 110px;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(1)};
  text-align: center;
`;

const StyledStarIcon = styled(StarIcon)`
  font-size: 20px;
  margin-right: 3px;
  vertical-align: top;
`;

type Props = {
  movie: {
    id: number;
    media_type?: string;
    poster_path?: string | null;
    release_date?: string | null;
    title: string;
    vote_average?: number;
  };
};

export default function MovieCard({
  movie: {
    media_type = 'movie',
    id,
    title,
    vote_average,
    poster_path,
    release_date,
  },
}: Props) {
  return (
    <CardContainer elevation={10}>
      <Link href={`/${media_type}/${id}`}>
        <CardActionArea>
          <Image
            alt={title}
            height="300"
            src={poster_path || '/no-image.jpg'}
            width="200"
          />
          <StyledCardContent>
            <Typography variant="subtitle2">{title}</Typography>
            <Typography color="textSecondary">
              {vote_average ? (
                <>
                  <StyledStarIcon />
                  {vote_average}
                </>
              ) : (
                release_date
              )}
            </Typography>
          </StyledCardContent>
        </CardActionArea>
      </Link>
    </CardContainer>
  );
}
