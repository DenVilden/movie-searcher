import React from 'react';
import Header from './Header';

type Props = {
  children: any;
};

const Layout = ({ children }: Props) => (
  <>
    <Header />
    {children}
  </>
);

export default Layout;
