import { Box } from "@material-ui/core"
import classnames from "clsx"
import ColorPicker from "components/ColorPicker"
import StylesContext from "contexts/Styles"
import useColorValue from "hooks/useColorValue"
import { useContext, useMemo } from "react"

import useStyles from "./styles"

const PropertyInput = ({ onColorChange, ...props }) => {
  const classes = useStyles()

  const colorValue = useColorValue(props.value)

  const { selectedProperty, setSelectedProperty } = useContext(StylesContext)

  const handleInputClick = () => {
    setSelectedProperty(props.token)
  }

  const isSelected = useMemo(() => {
    if (selectedProperty === undefined) return
    return selectedProperty === props.token
  }, [selectedProperty, props.token])

  return (
    <Box
      className={classnames(classes.propertyInput, {
        [classes.focused]: isSelected,
      })}
      onClick={handleInputClick}
    >
      {colorValue}
      <ColorPicker onChange={onColorChange} value={props.value} />
    </Box>
  )
}

export default PropertyInput
