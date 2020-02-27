import React from 'react';
import { ReactComponent as StyledLogo } from '../../assets/logo.svg';
import { LogoContainer } from './Logo.styles';

const Logo = () => (
  <LogoContainer aria-label="Logo" to="/">
    <StyledLogo />
  </LogoContainer>
);

export default Logo;
