import styled from 'styled-components';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

export const StyledCard = styled(Card)`
  height: 330px;
  text-align: center;
  width: 130px;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    width: 170px;
  }
`;

export const StyledCardMedia = styled(CardMedia)`
  height: 200px;
  margin: ${({ theme }) => theme.spacing(1, 1, 0, 1)};
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  height: 100px;
`;

export const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

export const IconWrapper = styled.span`
  display: flex;
`;
