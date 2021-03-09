import {
  Typography,
  CardContent,
  Card,
  Divider,
  Button,
  Slide,
} from '@material-ui/core';
import styled from '@emotion/styled';
import { useReactiveVar } from '@apollo/client/react';
import Image from 'next/image';
import Head from 'next/head';

import { favoritesVar } from 'apollo/client';
import { Favorite } from 'utils/types';
import { SimilarMovies } from 'apollo/__generated__';
import MoviesBox from './MoviesBox';

const StyledCard = styled(Card)`
  background-color: inherit;
  display: block;
  margin: ${({ theme }) => theme.spacing(11, 1, -8, 1)};

  ${({ theme }) => theme.breakpoints.up('md')} {
    display: flex;
  }
`;

const ImageWrapper = styled.div`
  height: 450px;
  position: relative;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 40%;
  }
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 60%;
  }
`;

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: space-between;
`;

interface Props {
  data: {
    backdrop_path?: string | null;
    budget?: string;
    id: number;
    media_type: string;
    number_of_episodes?: number;
    number_of_seasons?: number;
    overview?: string | null;
    poster_path?: string | null;
    release_date: string;
    revenue?: string;
    similar: SimilarMovies;
    title: string;
    vote_average: number;
  };
}

export default function MovieInfoComponent({ data }: Props) {
  const favorites = useReactiveVar(favoritesVar);

  const isInFavorites = favorites.some(favorite => favorite.id === data.id);

  const addOrRemoveFromFavorites = () => {
    let newFavorites: Favorite[];

    if (isInFavorites) {
      newFavorites = favorites.filter(favorite => favorite.id !== data.id);
      favoritesVar(newFavorites);
    } else {
      newFavorites = [
        ...favorites,
        {
          id: data.id,
          media_type: data.media_type,
          poster_path: data.poster_path,
          title: data.title,
        },
      ];
      favoritesVar(newFavorites);
    }

    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <Slide direction="up" in>
      <div>
        <Head key="title">
          <title>{data.title}</title>
        </Head>
        <StyledCard elevation={10}>
          <ImageWrapper>
            <Image
              alt={data.title}
              layout="fill"
              objectFit="cover"
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
        {!!data.similar.results.length && (
          <MoviesBox movies={data.similar.results} title="Similar Movies" />
        )}
      </div>
    </Slide>
  );
}
