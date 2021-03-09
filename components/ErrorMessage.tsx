import { Alert, AlertTitle } from '@material-ui/core';
import { css, useTheme } from '@emotion/react';

export default function ErrorMessage({ error }: { error: string }) {
  const theme = useTheme();

  return (
    <Alert
      css={() => css`
        margin: ${theme.spacing(2, 2, 0, 2)};
      `}
      elevation={12}
      severity="error"
      variant="filled"
    >
      <AlertTitle>Error</AlertTitle>
      {error}
    </Alert>
  );
}
