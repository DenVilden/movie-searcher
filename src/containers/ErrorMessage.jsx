import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Spinner from '../components/Spinner';

const ErrorMessage = styled(({ children, ...otherProps }) => (
  <Suspense fallback={<Spinner />}>
    <Typography align="center" color="error" variant="h6" {...otherProps}>
      {children}
    </Typography>
  </Suspense>
))`
  &.MuiTypography-root {
    padding: ${({ theme }) => theme.spacing(4)}px;
  }
`;

export default ErrorMessage;
