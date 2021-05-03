import { Box, IconButton, Popover } from "@material-ui/core"
import ColorDot from "components/Common/ColorDot"
import useColorValue from "hooks/useColorValue"
import usePrevious from "hooks/usePrevious"
import { observer } from "mobx-react"
import { useCallback, useEffect, useState } from "react"
import { ChromePicker } from "react-color"
import Colors from "store/models/Colors"

import useStyles from "./styles"

const ColorPicker = ({ value, onChange, disabled = false }) => {
  const classes = useStyles()

  const [innerValue, setInnerValue] = useState()

  useEffect(() => {
    const existingColor = Colors.find((c) => c.value === value.value)
    if (existingColor) {
      setInnerValue(existingColor.background)
    } else {
      setInnerValue(value.valueToString)
    }
  }, [value.value, value.valueToString])

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
      <IconButton size="small" disabled={disabled} onClick={handleOpenPicker}>
        <ColorDot color={colorValue} />
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
