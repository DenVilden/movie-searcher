import { Alert, AlertTitle } from '@material-ui/core'
import { css, useTheme } from '@emotion/react'

interface Props {
  error: string
}

export default function ErrorMessage({ error }: Props) {
  const theme = useTheme()

  return (
    <Alert
      css={() => css`
        margin: ${theme.spacing(10, 2, 0, 2)};
      `}
      elevation={10}
      severity="error"
      variant="filled"
    >
      <AlertTitle>Error</AlertTitle>
      {error}
    </Alert>
  )
}
