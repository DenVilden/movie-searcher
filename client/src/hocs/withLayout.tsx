import Header from "../containers/Header";

const withLayout = (WrappedComponent: React.ComponentType) => ({
  ...props
}) => (
  <>
    <Header />
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <WrappedComponent {...props} />
  </>
);

export default withLayout;
