import React from 'react';
import Header from '../containers/Header';

export default (WrappedComponent: React.ComponentType) => ({ ...props }) => (
  <>
    <Header />
    <WrappedComponent {...props} />
  </>
);
