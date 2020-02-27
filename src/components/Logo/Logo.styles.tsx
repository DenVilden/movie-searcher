import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LogoContainer = styled(Link)`
  cursor: pointer;
  display: none;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: block;
  }
`;
