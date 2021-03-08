import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import styled from '@emotion/styled';

const StyledAlert = styled(Alert)`
  margin: ${({ theme }) => theme.spacing(2, 2, 0, 2)};
`;

interface Props {
  error: string;
}

export default function ErrorMessage({ error }: Props) {
  return (
    <StyledAlert elevation={12} severity="error" variant="filled">
      <AlertTitle>Error</AlertTitle>
      {error}
    </StyledAlert>
  );
}
