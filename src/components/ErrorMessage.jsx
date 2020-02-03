import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Spinner from './Spinner';

const propTypes = {
  children: PropTypes.string.isRequired,
};

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

ErrorMessage.propTypes = propTypes;

export default ErrorMessage;
