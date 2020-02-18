import React from 'react';
import { CardActionArea } from '@material-ui/core';
import noImage from '../../assets/no-image.jpg';
import {
  StyledTypography,
  CardWrapper,
  StyledCardMedia,
} from './FavoritesCard.styles';

type Props = {
  clearInputValue: () => void;
  toggleFavoritesOpen: () => void;
  poster: string | null;
  title: string;
  goTo: () => void;
};

const FavoritesCard = ({
  clearInputValue,
  toggleFavoritesOpen,
  poster,
  title,
  goTo,
}: Props) => (
  <CardActionArea
    onClick={() => {
      goTo();
      clearInputValue();
      toggleFavoritesOpen();
    }}
  >
    <CardWrapper>
      <StyledCardMedia image={poster || noImage} src="img" title={title} />
      <StyledTypography>{title}</StyledTypography>
    </CardWrapper>
  </CardActionArea>
);

export default FavoritesCard;
