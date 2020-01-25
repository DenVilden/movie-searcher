import styled from 'styled-components';
import { Grid, Paper } from '@material-ui/core';

export const Root = styled(Paper)`
  background: none;
  background-color: inherit;
  margin: ${({ theme, padding }) => padding && theme.spacing(2)}px;
  padding: ${({ theme, padding }) => padding && theme.spacing(2, 0, 4, 0)};
`;

export const List = styled(Grid)`
  flex-grow: 1;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    padding: ${({ theme }) => theme.spacing(0, 2, 0, 2)};
  }
`;

export const Wrapper = styled(Grid)`
  margin-top: 10px;
`;
