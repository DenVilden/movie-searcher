import styled from 'styled-components';
import { Typography, CardContent, Card, CardMedia } from '@material-ui/core';

export const StyledCard = styled(Card)`
  background-color: inherit;
  display: block;
  margin: ${({ theme }) => theme.spacing(2)}px;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: flex;
  }
`;

export const StyledCardMedia = styled(CardMedia)`
  height: 450px;
  margin: ${({ theme }) => theme.spacing(2)}px;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    width: 40%;
  }
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    width: 60%;
  }
`;

export const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: space-between;
`;
