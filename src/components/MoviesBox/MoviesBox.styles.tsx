import styled from 'styled-components';
import { Grid, Paper, Theme } from '@material-ui/core';

export const Root = styled(Paper)`
  background: none;
  background-color: inherit;
  margin: ${({ theme, padding }: { theme: Theme; padding: any }) =>
    padding && theme.spacing(2)}px;
  padding: ${({ theme, padding }: { theme: Theme; padding: any }) =>
    padding && theme.spacing(2, 0, 4, 0)};
`;

export const List = styled(Grid)`
  flex-grow: 1;

  ${({ theme }: { theme: Theme }) => theme.breakpoints.up('sm')} {
    padding: ${({ theme }: { theme: Theme }) => theme.spacing(0, 2, 0, 2)};
  }
`;

export const Wrapper = styled(Grid)`
  margin-top: 10px;
`;
