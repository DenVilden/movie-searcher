import {
  Typography,
  CardContent,
  Card,
  Divider,
  Button,
} from '@material-ui/core';
import styled from 'styled-components';
import Head from 'next/head';
import { useReactiveVar } from '@apollo/client';
import Image from 'next/image';
import { useEffect } from 'react';
import { favoritesVar, GetMovieInfoQuery } from '../../apollo';

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
  data: GetMovieInfoQuery;
}

const MovieInfo = ({ data }: Props) => {
  const favorites = useReactiveVar(favoritesVar);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const isInFavorites = favorites.some(
    (favorite) => favorite.id === data.movieInfo.id,
  );

  const addOrRemoveFromFavorites = () => {
    if (isInFavorites) {
      favoritesVar(
        favorites.filter((favorite) => favorite.id !== data.movieInfo.id),
      );
    } else {
      favoritesVar([...favorites, data.movieInfo]);
    }
  };

  return (
    <StyledCard elevation={10}>
      <Head>
        <title>{data.movieInfo.title}</title>
      </Head>
      <ImageWrapper>
        <Image
          layout="fill"
          objectFit="cover"
          alt={data.movieInfo.title}
          src={data.movieInfo.backdrop_path || '/no-image.jpg'}
        />
      </ImageWrapper>
      <StyledCardContent>
        <StyledTypography gutterBottom variant="h5">
          {data.movieInfo.title}
          <Button
            color={isInFavorites ? 'secondary' : 'primary'}
            data-testid="favorites-button"
            onClick={addOrRemoveFromFavorites}
            variant="contained"
          >
            {isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
          </Button>
        </StyledTypography>
        <Typography>{data.movieInfo.overview}</Typography>
        <Divider />
        <Typography>
          <b>Budget:</b> {data.movieInfo.budget}
        </Typography>
        <Divider />
        <Typography>
          <b>Revenue:</b> {data.movieInfo.revenue}
        </Typography>
        <Divider />
        <Typography>
          <b>Rating:</b> {data.movieInfo.vote_average}
        </Typography>
        <Divider />
        <Typography>
          <b>Release Date:</b> {data.movieInfo.release_date}
        </Typography>
      </StyledCardContent>
    </StyledCard>
  );
};

export default MovieInfo;
