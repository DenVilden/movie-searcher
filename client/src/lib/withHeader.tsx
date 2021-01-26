/* eslint-disable react/jsx-props-no-spreading */
import Header from "../containers/Header";

const withHeader = (Component: React.ComponentType) => ({ ...pageProps }) => (
  <>
    <Header />
    <Component {...pageProps} />
  </>
);

export default withHeader;
