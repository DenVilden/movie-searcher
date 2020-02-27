import React from 'react';
import styled from 'styled-components';
import { Typography, Theme } from '@material-ui/core';

type Props = {
  children: string;
  gutterBottom?: boolean;
};

const ErrorMessage = styled(
  ({ children, gutterBottom, ...otherProps }: Props) => (
    <Typography
      align="center"
      color="error"
      gutterBottom={gutterBottom}
      role="errormessage"
      variant="h6"
      {...otherProps}
    >
      {children}
    </Typography>
  )
)`
  &.MuiTypography-root {
    padding: ${({ theme }: { theme: Theme }) => theme.spacing(4)}px;
  }
`;

export default ErrorMessage;
