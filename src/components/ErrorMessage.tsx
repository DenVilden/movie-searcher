import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Typography, Theme } from '@material-ui/core';
import Spinner from './Spinner';

type Props = {
  children: string;
};

const ErrorMessage = styled(({ children, ...otherProps }: Props) => (
  <Suspense fallback={<Spinner />}>
    <Typography align="center" color="error" variant="h6" {...otherProps}>
      {children}
    </Typography>
  </Suspense>
))`
  &.MuiTypography-root {
    padding: ${({ theme }: { theme: Theme }) => theme.spacing(4)}px;
  }
`;

export default ErrorMessage;
