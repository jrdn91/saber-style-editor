import { Box } from "@material-ui/core"
import classnames from "clsx"
import ColorPicker from "components/ColorPicker"
import StylesContext from "contexts/Styles"
import { observer } from "mobx-react"
import { getType } from "mobx-state-tree"
import { useContext, useMemo } from "react"
import Rgb from "store/models/ValueTypes/Rgb"

import useStyles from "./styles"

const PropertyInput = ({ property }) => {
  const classes = useStyles()

  const { selectedProperty, setSelectedProperty } = useContext(StylesContext)

  const handleInputClick = (e) => {
    // prevents clicking inside property input from triggering "outside click" functionality
    e.preventDefault()
    e.stopPropagation()
    if (e.target.classList.contains(classes.propertyInput)) {
      setSelectedProperty(property)
    }
  }

  const isSelected = useMemo(() => {
    if (selectedProperty === undefined) return
    return selectedProperty === property
  }, [selectedProperty, property])

  const handleColorChange = (color) => {
    if (property.value.title === "Color") {
      // if is color, change to Rgb
      const rgbColor = Rgb.create({
        value: color,
      })
      property.updateValue(rgbColor)
    } else {
      property.value.update(color)
    }
    // property.value.update(color)
  }

  const isColorType = useMemo(() => {
    const propertyTypeName = getType(property?.value).name
    return propertyTypeName === "Color" || propertyTypeName === "Rgb"
  }, [property?.value])

  return (
    <Box
      className={classnames(classes.propertyInput, {
        [classes.focused]: isSelected,
      })}
      onClick={handleInputClick}
    >
      {property?.value?.displayValue}
      {isColorType && (
        <ColorPicker onChange={handleColorChange} value={property?.value} />
      )}
    </Box>
  )
}

export default observer(PropertyInput)
