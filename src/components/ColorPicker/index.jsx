import { Box, IconButton, Popover } from "@material-ui/core"
import useColorValue from "hooks/useColorValue"
import { useState } from "react"
import { ChromePicker } from "react-color"

import useStyles from "./styles"

const ColorPicker = ({ value, onChange }) => {
  const classes = useStyles()

  const [innerValue, setInnerValue] = useState(value)

  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenPicker = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    onChange?.(innerValue)
  }

  const handleColorChange = (color) => {
    setInnerValue(color.rgb)
  }

  const colorValue = useColorValue(innerValue)

  const open = Boolean(anchorEl)

  return (
    <>
      <IconButton size="small" onClick={handleOpenPicker}>
        <Box
          height="22px"
          width="22px"
          borderRadius="50%"
          bgcolor={colorValue}
          border="2px solid white"
          style={{ cursor: "pointer" }}
        />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <ChromePicker
          disableAlpha
          color={innerValue}
          onChange={handleColorChange}
        />
      </Popover>
    </>
  )
}

export default ColorPicker
