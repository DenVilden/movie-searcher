import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Spinner from '../Spinner/Spinner';

const ErrorBoundary = styled(({ children, className, gutterBottom }) => (
  <Suspense fallback={<Spinner />}>
    <Typography
      align="center"
      className={className}
      color="error"
      gutterBottom={gutterBottom}
      variant="h6"
    >
      {children}
    </Typography>
  </Suspense>
))`
  &.MuiTypography-root {
    padding: ${({ theme }) => theme.spacing(4)}px;
  }
`;

export default ErrorBoundary;
