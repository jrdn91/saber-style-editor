import { Box } from "@material-ui/core"

import useStyles from "./styles"

const SaberViewer = ({ children }) => {
  const classes = useStyles()

  return <Box className={classes.saberViewer}>Saber here</Box>
}

export default SaberViewer
