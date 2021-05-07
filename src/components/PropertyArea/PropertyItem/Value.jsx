import { Typography } from "@material-ui/core"
import ColorPicker from "components/ColorPicker"
import { getType } from "mobx-state-tree"
import React, { useMemo } from "react"
import Rgb from "store/models/ValueTypes/Rgb"

import useStyles from "./styles"

const Value = ({ propertyValue, isToken }) => {
  const classes = useStyles()

  const handleColorChange = (color) => {
    if (propertyValue.value.title === "Color") {
      // if is color, change to Rgb
      const rgbColor = Rgb.create({
        value: color,
      })
      propertyValue.updateValue(rgbColor)
    } else {
      propertyValue.value.update(color)
    }
  }

  const isColorType = useMemo(() => {
    const propertyTypeName = getType(propertyValue).name
    return propertyTypeName === "Color" || propertyTypeName === "Rgb"
  }, [propertyValue])

  return (
    <>
      <Typography variant="body2" className={classes.text}>
        {propertyValue?.displayValue}
      </Typography>
      {isColorType && (
        <ColorPicker
          onChange={handleColorChange}
          value={propertyValue}
          disabled={isToken}
        />
      )}
    </>
  )
}

export default Value
