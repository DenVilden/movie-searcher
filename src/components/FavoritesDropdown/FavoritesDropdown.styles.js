import styled from 'styled-components';
import { Typography, CardMedia, Popover } from '@material-ui/core';

export const StyledTypography = styled(Typography)`
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

export const CardWrapper = styled.div`
  display: flex;
  min-width: 200px;
`;

export const StyledCardMedia = styled(CardMedia)`
  height: 56px;
  margin: ${({ theme }) => theme.spacing(1)}px;
  width: 50px;
  display: none;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: block;
  }
`;

export const StyledPopover = styled(Popover)`
  & .MuiPopover-paper {
    right: 16px;
    top: 45px;
  }
`;
