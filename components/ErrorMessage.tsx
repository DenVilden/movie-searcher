import { Alert, AlertTitle } from '@material-ui/core';
import styled from '@emotion/styled';

const StyledAlert = styled(Alert)`
  margin: ${({ theme }) => theme.spacing(2, 2, 0, 2)};
`;

interface Props {
  error: string;
}

export default function ErrorMessage({ error }: Props) {
  return (
    <StyledAlert elevation={12} variant="filled" severity="error">
      <AlertTitle>Error</AlertTitle>
      {error}
    </StyledAlert>
  );
}
