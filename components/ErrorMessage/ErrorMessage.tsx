import { Alert, AlertTitle } from '@material-ui/lab';
import styled from 'styled-components';

const StyledAlert = styled(Alert)`
  margin: ${(props) => props.theme.spacing(2, 2, 0, 2)};
`;

interface Props {
  error: string;
}

const ErrorMessage = ({ error }: Props) => (
  <StyledAlert elevation={12} variant="filled" severity="error">
    <AlertTitle>Error</AlertTitle>
    {error}
  </StyledAlert>
);

export default ErrorMessage;
