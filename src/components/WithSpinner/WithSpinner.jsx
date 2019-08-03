import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const StyledCircularProgress = styled(CircularProgress)`
  margin-left: 50%;
  margin-top: 5%;
`;

const WithSpinner = WrappedComponent => {
  const Wrapped = ({ loading, ...props }) =>
    loading ? <StyledCircularProgress /> : <WrappedComponent {...props} />;

  Wrapped.propTypes = {
    loading: PropTypes.bool.isRequired
  };

  return Wrapped;
};

export default WithSpinner;
