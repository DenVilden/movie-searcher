import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const ErrorBoundary = styled(({ children, ...props }) => (
  <Typography
    align="center"
    classes={{ root: 'root' }}
    color="error"
    variant="h6"
    {...props}
  >
    {children}
  </Typography>
))`
  &.root {
    padding: ${({ theme }) => theme.spacing(4)}px;
  }
`;

export default ErrorBoundary;