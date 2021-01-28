/* eslint-disable react/jsx-props-no-spreading */
import Header from "../sections/Header/Header";

const withHeader = (Component: React.ComponentType) => ({ ...pageProps }) => (
  <>
    <Header />
    <Component {...pageProps} />
  </>
);

export default withHeader;
