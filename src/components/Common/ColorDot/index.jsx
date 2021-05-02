import { Box } from "@material-ui/core"

import useStyles from "./styles"

const ColorDot = ({ color }) => {
  return (
    <Box
      height="22px"
      width="22px"
      borderRadius="50%"
      bgcolor={color}
      border="2px solid #dcdcdc"
      style={{ cursor: "pointer" }}
    />
  )
}

export default ColorDot
