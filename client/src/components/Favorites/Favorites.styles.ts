import { Typography, Popover, IconButton } from "@material-ui/core";
import styled from "styled-components";

export const StyledIconButton = styled(IconButton)`
  margin-left: auto;
`;

export const StyledTypography = styled(Typography)`
  padding: ${(props) => props.theme.spacing(2)}px;
`;

export const StyledPopover = styled(Popover)`
  .MuiPopover-paper {
    right: 16px;
    top: 45px;
  }
`;
