import React from 'react';
import Header from './Header';

export default (WrappedComponent: React.ComponentType) => ({ ...props }) => (
  <>
    <Header />
    <WrappedComponent {...props} />
  </>
);
