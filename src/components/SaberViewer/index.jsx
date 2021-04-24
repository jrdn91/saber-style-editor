import { Box } from "@material-ui/core"

import useStyles from "./styles"

const SaberViewer = ({ children }) => {
  const classes = useStyles()

  return (
    <Box
      bgcolor="black"
      color="white"
      height="180px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      Saber here
    </Box>
  )
}

export default SaberViewer
