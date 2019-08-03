import styled from 'styled-components';
import { Grid, Paper } from '@material-ui/core';

export const Root = styled(Paper)`
  background: none;
  margin: ${({ theme, padding }) => padding && theme.spacing(2)}px;
  padding: ${({ theme, padding }) => padding && theme.spacing(2, 0, 4, 0)};
  background-color: inherit;
`;

export const List = styled(Grid)`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing(0, 2, 0, 2)};
`;

export const Wrapper = styled(Grid)`
  margin-top: 10px;
`;
