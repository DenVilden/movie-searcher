import styled from "styled-components";

// eslint-disable-next-line import/prefer-default-export
export const LogoContainer = styled.a`
  cursor: pointer;
  display: none;

  ${(props) => props.theme.breakpoints.up("sm")} {
    display: block;
  }
`;
