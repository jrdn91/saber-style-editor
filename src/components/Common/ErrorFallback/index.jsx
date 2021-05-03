import { Box, Typography } from "@material-ui/core"

import useStyles from "./styles"

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Box p={2} role="alert">
      <Typography>Something went wrong:</Typography>
      <pre>{error.message}</pre>
    </Box>
  )
}

export default ErrorFallback
