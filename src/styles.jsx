import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    background-color: #f8f8ff;
    margin: 0;
    min-width: 320px;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
