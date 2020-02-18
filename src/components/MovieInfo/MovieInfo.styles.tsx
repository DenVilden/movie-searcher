import {
  Typography,
  CardContent,
  Card,
  CardMedia,
  Theme,
} from '@material-ui/core';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  background-color: inherit;
  display: block;
  margin: ${({ theme }: { theme: Theme }) => theme.spacing(2)}px;

  ${({ theme }: { theme: Theme }) => theme.breakpoints.up('sm')} {
    display: flex;
  }
`;

export const StyledCardMedia = styled(CardMedia)`
  height: 450px;
  margin: ${({ theme }: { theme: Theme }) => theme.spacing(2)}px;

  ${({ theme }: { theme: Theme }) => theme.breakpoints.up('sm')} {
    width: 40%;
  }
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ theme }: { theme: Theme }) => theme.breakpoints.up('sm')} {
    width: 60%;
  }
`;

export const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: space-between;
`;
