/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const StyledTypography = styled(Typography)`
  padding: ${({ theme }) => theme.spacing(4)}px;
`;
