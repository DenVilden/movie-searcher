import { CssBaseline } from "@material-ui/core";
import { createGlobalStyle } from "styled-components";
import Header from "../containers/Header";

const GlobalStyle = createGlobalStyle`
  body {
    min-width: 320px;
  }
`;

const withLayout = (WrappedComponent: React.ComponentType) => ({
  ...props
}) => (
  <>
    <CssBaseline />
    <GlobalStyle />
    <Header />
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <WrappedComponent {...props} />
  </>
);

export default withLayout;
