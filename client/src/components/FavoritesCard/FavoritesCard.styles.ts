import { Typography } from "@material-ui/core";
import styled from "styled-components";

export const StyledTypography = styled(Typography)`
  padding: ${(props) => props.theme.spacing(3, 2, 2, 2)};
`;

export const CardWrapper = styled.div`
  display: flex;
  min-width: 200px;
`;

export const StyledCardMedia = styled("div")`
  display: none;
  height: 56px;
  position: relative;
  margin: ${(props) => props.theme.spacing(1)}px;
  width: 50px;

  ${(props) => props.theme.breakpoints.up("sm")} {
    display: block;
  }
`;
