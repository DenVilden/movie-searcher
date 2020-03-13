import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Typography } from '@material-ui/core';

type Props = {
  theme: DefaultTheme;
};

const NotFoundMessage = styled((props: Props) => (
  <Typography align="center" color="error" gutterBottom variant="h6" {...props}>
    No results
  </Typography>
))`
  &.MuiTypography-root {
    padding: ${props => props.theme.spacing(4)}px;
  }
`;

export default NotFoundMessage;
