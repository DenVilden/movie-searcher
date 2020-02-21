import styled from 'styled-components';
import { Grid, Paper, Theme, Button } from '@material-ui/core';

export const Root = styled(Paper)`
  background: none;
  background-color: inherit;
  margin: ${({ theme, padding }: { theme: Theme; padding: number }) =>
    padding && theme.spacing(8, 15, 3, 15)};
  padding: ${({ theme, padding }: { theme: Theme; padding: number }) =>
    padding && theme.spacing(2, 0, 4, 0)};
`;

export const Wrapper = styled(Grid)`
  margin-top: 10px;

  ${({ theme }: { theme: Theme }) => theme.breakpoints.up('sm')} {
    padding: ${({ theme }: { theme: Theme }) => theme.spacing(0, 2, 0, 2)};
  }
`;

export const StyledButton = styled(Button)`
  margin: auto;
  margin-top: 70px;
`;
