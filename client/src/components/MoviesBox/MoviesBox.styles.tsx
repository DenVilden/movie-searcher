import styled, { DefaultTheme } from 'styled-components';
import { Grid, Paper } from '@material-ui/core';

type Props = {
  padding: number;
  theme: DefaultTheme;
};

export const Root = styled(Paper)`
  background: none;
  background-color: inherit;
  margin: ${(props: Props) => props.padding && props.theme.spacing(3, 1, 3, 1)};
  padding: ${(props: Props) =>
    props.padding && props.theme.spacing(2, 0, 4, 0)};
`;

export const Wrapper = styled(Grid)`
  margin-top: 10px;

  ${(props) => props.theme.breakpoints.up('sm')} {
    padding: ${(props) => props.theme.spacing(0, 2, 0, 2)};
  }
`;
