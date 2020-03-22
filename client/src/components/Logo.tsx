import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const LogoContainer = styled.a`
  cursor: pointer;
  display: none;

  ${props => props.theme.breakpoints.up('sm')} {
    display: block;
  }
`;

const Logo = () => (
  <Link href="/">
    <LogoContainer aria-label="Logo">
      <img alt="logo" src="/logo.svg" />
    </LogoContainer>
  </Link>
);

export default Logo;
