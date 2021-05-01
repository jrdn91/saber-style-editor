import { Box, IconButton, Popover } from "@material-ui/core"
import useColorValue from "hooks/useColorValue"
import usePrevious from "hooks/usePrevious"
import { observer } from "mobx-react"
import { useCallback, useEffect, useState } from "react"
import { ChromePicker } from "react-color"
import Colors from "store/models/Colors"

import useStyles from "./styles"

const ColorPicker = ({ value, onChange }) => {
  const classes = useStyles()

  const [innerValue, setInnerValue] = useState()

  useEffect(() => {
    const existingColor = Colors.find((c) => c.value === value.value)
    if (existingColor) {
      setInnerValue(existingColor.background)
    } else {
      setInnerValue(value.value.toJSON())
    }
  }, [value.value])

  const previousInnerValue = usePrevious(innerValue)

  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenPicker = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = useCallback(() => {
    setAnchorEl(null)
    if (previousInnerValue !== innerValue) {
      onChange?.(innerValue)
    }
  }, [previousInnerValue, innerValue, onChange])

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
          border="2px solid #dcdcdc"
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

export default observer(ColorPicker)
