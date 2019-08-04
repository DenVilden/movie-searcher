import React from 'react';
import PropTypes from 'prop-types';
import { StyledCircularProgress } from './WithSpinner.styles';

export default WrappedComponent => {
  const hocComponent = ({ loading, ...props }) =>
    loading ? <StyledCircularProgress /> : <WrappedComponent {...props} />;

  hocComponent.propTypes = {
    loading: PropTypes.bool.isRequired
  };

  return hocComponent;
};
