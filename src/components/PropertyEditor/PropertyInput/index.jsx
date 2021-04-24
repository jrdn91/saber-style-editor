import { Box, InputAdornment, TextField } from "@material-ui/core"
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

  console.log(selectedProperty)

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
    // <TextField
    //   className={classes.textField}
    //   key={props.token}
    //   label={props.title}
    //   name={props.token}
    //   id={props.token}
    //   value={colorValue}
    //   focused={selectedProperty?.token === props.token}
    //   readOnly
    //   onClick={handleInputClick}
    //   InputProps={{
    //     endAdornment: props.allowedValues.includes("color") ? (
    //       <InputAdornment position="end">
    //         <ColorPicker onChange={onColorChange} value={props.value} />
    //       </InputAdornment>
    //     ) : null,
    //   }}
    // />
  )
}

export default PropertyInput
