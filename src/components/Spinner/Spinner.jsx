import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

export const StyledCircularProgress = styled(CircularProgress)`
  margin-left: 50%;
  margin-top: 5%;
`;

const Spinner = () => <StyledCircularProgress />;

export default Spinner;
