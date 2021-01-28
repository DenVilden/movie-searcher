import { Typography, Card, CardContent } from "@material-ui/core";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  text-align: center;
  width: 130px;

  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 170px;
  }
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  height: 100px;
  padding: ${(props) => props.theme.spacing(2, 1, 1, 1)};
`;

export const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

export const IconWrapper = styled.span`
  display: flex;

  svg {
    height: 0.9em;
  }
`;
