import styled from 'styled-components';
import { Link } from 'react-router-dom';

// eslint-disable-next-line import/prefer-default-export
export const LogoContainer = styled(Link)`
  cursor: pointer;
  display: none;

  ${props => props.theme.breakpoints.up('sm')} {
    display: block;
  }
`;
