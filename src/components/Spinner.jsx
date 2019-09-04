import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const Spinner = () => <StyledCircularProgress />;

const StyledCircularProgress = styled(CircularProgress)`
  margin-left: 50%;
  margin-top: 5%;
`;

export default Spinner;
