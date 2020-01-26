import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    background-color: #f8f8ff;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    margin: 0;
    min-width: 320px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
