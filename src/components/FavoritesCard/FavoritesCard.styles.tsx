import { Typography, CardMedia, Theme } from '@material-ui/core';
import styled from 'styled-components';

export const StyledTypography = styled(Typography)`
  padding: ${({ theme }: { theme: Theme }) => theme.spacing(2)}px;
`;

export const CardWrapper = styled.div`
  display: flex;
  min-width: 200px;
`;

export const StyledCardMedia = styled(CardMedia)`
  display: none;
  height: 56px;
  margin: ${({ theme }: { theme: Theme }) => theme.spacing(1)}px;
  width: 50px;

  ${({ theme }: { theme: Theme }) => theme.breakpoints.up('sm')} {
    display: block;
  }
`;
