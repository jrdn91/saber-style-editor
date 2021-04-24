import { Box } from "@material-ui/core"
import classnames from "clsx"
import ColorPicker from "components/ColorPicker"
import StylesContext from "contexts/Styles"
import { observer } from "mobx-react"
import { useContext, useMemo } from "react"

import useStyles from "./styles"

const PropertyInput = ({ onColorChange, property }) => {
  const classes = useStyles()

  const { selectedProperty, setSelectedProperty } = useContext(StylesContext)

  const handleInputClick = () => {
    setSelectedProperty(property)
  }

  const isSelected = useMemo(() => {
    if (selectedProperty === undefined) return
    return selectedProperty === property
  }, [selectedProperty, property])

  console.log("value", property?.value?.value)

  return (
    <Box
      className={classnames(classes.propertyInput, {
        [classes.focused]: isSelected,
      })}
      onClick={handleInputClick}
    >
      {property?.value?.displayValue}
      <ColorPicker onChange={onColorChange} value={property?.value?.value} />
    </Box>
  )
}

export default observer(PropertyInput)
