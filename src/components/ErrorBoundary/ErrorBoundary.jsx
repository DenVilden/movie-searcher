import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const ErrorBoundary = styled(({ children, className, gutterBottom }) => (
  <Typography
    align="center"
    classes={{ root: 'root' }}
    className={className}
    color="error"
    gutterBottom={gutterBottom}
    variant="h6"
  >
    {children}
  </Typography>
))`
  &.root {
    padding: ${({ theme }) => theme.spacing(4)}px;
  }
`;

export default ErrorBoundary;
