import {
  Typography,
  CardContent,
  Card,
  Divider,
  Button,
} from '@material-ui/core';
import styled from 'styled-components';
import { useReactiveVar } from '@apollo/client';
import Image from 'next/image';
import { useEffect } from 'react';
import { favoritesVar } from '../../apollo';
import type { Favorites } from '../../apollo';

const StyledCard = styled(Card)`
  background-color: inherit;
  display: block;
  margin: ${(props) => props.theme.spacing(2)}px;

  ${(props) => props.theme.breakpoints.up('md')} {
    display: flex;
  }
`;

const ImageWrapper = styled.div`
  height: 450px;
  position: relative;
  width: 100%;

  ${(props) => props.theme.breakpoints.up('md')} {
    width: 40%;
  }
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${(props) => props.theme.breakpoints.up('md')} {
    width: 60%;
  }
`;

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: space-between;
`;

interface Props {
  data: Favorites;
}

export default function MovieInfoComponent({ data }: Props) {
  const favorites = useReactiveVar(favoritesVar);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const isInFavorites = favorites.some((favorite) => favorite.id === data.id);

  const addOrRemoveFromFavorites = () => {
    if (isInFavorites) {
      favoritesVar(favorites.filter((favorite) => favorite.id !== data.id));
    } else {
      favoritesVar([...favorites, data]);
    }
  };

  return (
    <StyledCard elevation={10}>
      <ImageWrapper>
        <Image
          layout="fill"
          objectFit="cover"
          alt={data.title}
          src={data.backdrop_path || '/no-image.jpg'}
        />
      </ImageWrapper>
      <StyledCardContent>
        <StyledTypography gutterBottom variant="h5">
          {data.title}
          <Button
            color={isInFavorites ? 'secondary' : 'primary'}
            onClick={addOrRemoveFromFavorites}
            variant="contained"
          >
            {isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
          </Button>
        </StyledTypography>
        <Typography>{data.overview}</Typography>
        <Divider />
        <Typography>
          {data.media_type === 'movie' ? <b>Budget:</b> : <b>Seasons:</b>}{' '}
          {data.budget || data.number_of_seasons}
        </Typography>
        <Divider />
        <Typography>
          {data.media_type === 'movie' ? <b>Revenue:</b> : <b>Episodes:</b>}{' '}
          {data.revenue || data.number_of_episodes}
        </Typography>
        <Divider />
        <Typography>
          <b>Rating:</b> {data.vote_average}
        </Typography>
        <Divider />
        <Typography>
          <b>Release Date:</b> {data.release_date}
        </Typography>
      </StyledCardContent>
    </StyledCard>
  );
}
