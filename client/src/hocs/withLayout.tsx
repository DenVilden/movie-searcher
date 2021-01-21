import Header from "../containers/Header";

const withLayout = (WrappedComponent: React.ComponentType) => ({
  ...props
}) => (
  <>
    <Header />
    <WrappedComponent {...props} />
  </>
);

export default withLayout;
