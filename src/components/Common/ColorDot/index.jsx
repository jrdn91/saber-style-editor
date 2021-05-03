import { Box } from "@material-ui/core"
import Color from "color"
import { isEmpty } from "lodash"
import { useMemo } from "react"

import useStyles from "./styles"

const ColorDot = ({ color }) => {
  const dotColor = useMemo(() => {
    if (!isEmpty(color)) {
      const colorProp = Color(color.toLowerCase())
      if (colorProp.isLight) {
        return colorProp.darken(0.6).fade(0.8).string()
      } else {
        return colorProp.fade(0.6).string()
      }
    }
    return ""
  }, [color])
  return (
    <Box
      height="22px"
      width="22px"
      borderRadius="50%"
      bgcolor={color}
      boxShadow={`0px 3px 3px -2px ${dotColor}, 0px 3px 4px 0px ${dotColor}, 0px 1px 8px 0px ${dotColor}`}
      style={{ cursor: "pointer" }}
    />
  )
}

export default ColorDot
