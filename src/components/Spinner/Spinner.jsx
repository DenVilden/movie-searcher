import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const Spinner = styled(props => (
  <CircularProgress classes={{ root: 'root' }} {...props} />
))`
  &.root {
    margin-left: 50%;
    margin-top: 5%;
  }
`;

export default Spinner;
