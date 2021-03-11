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

const StyledCard = styled(Card)`
  text-align: center;
  width: 170px;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  height: 100px;
  padding: ${({ theme }) => theme.spacing(1)};
`;

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

const IconWrapper = styled.span`
  display: flex;

  svg {
    height: 0.9em;
  }
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
    <StyledCard elevation={10}>
      <Link href={`/${media_type}/${id}`}>
        <CardActionArea>
          <Image
            alt={title}
            height="300"
            src={poster_path || '/no-image.jpg'}
            width="170"
          />
          <StyledCardContent>
            <Typography variant="subtitle2">{title}</Typography>
            <StyledTypography color="textSecondary">
              {vote_average ? (
                <IconWrapper>
                  <StarIcon /> {vote_average}
                </IconWrapper>
              ) : (
                release_date
              )}
            </StyledTypography>
          </StyledCardContent>
        </CardActionArea>
      </Link>
    </StyledCard>
  );
}
