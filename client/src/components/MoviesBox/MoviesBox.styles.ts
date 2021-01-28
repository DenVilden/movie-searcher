import { Grid, Paper } from "@material-ui/core";
import styled, { DefaultTheme } from "styled-components";

export const Root = styled(Paper)`
  background: none;
  background-color: inherit;
  margin: ${(props: { padding: number; theme: DefaultTheme }) =>
    props.padding && props.theme.spacing(3, 1, 3, 1)};
  padding: ${(props: { padding: number; theme: DefaultTheme }) =>
    props.padding && props.theme.spacing(2, 0, 4, 0)};
`;

export const Wrapper = styled(Grid)`
  margin-top: 10px;

  ${(props) => props.theme.breakpoints.up("sm")} {
    padding: ${(props) => props.theme.spacing(0, 2, 0, 2)};
  }
`;
