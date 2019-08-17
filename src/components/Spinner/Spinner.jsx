import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const Spinner = styled(({ className }) => (
  <CircularProgress classes={{ root: 'root' }} className={className} />
))`
  &.root {
    margin-left: 50%;
    margin-top: 5%;
  }
`;

export default Spinner;
