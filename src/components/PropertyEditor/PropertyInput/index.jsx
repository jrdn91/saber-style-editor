import { InputAdornment, TextField } from "@material-ui/core"
import ColorPicker from "components/ColorPicker"
import useColorValue from "hooks/useColorValue"

import useStyles from "./styles"

const PropertyInput = ({ onColorChange, ...props }) => {
  const classes = useStyles()

  const colorValue = useColorValue(props.value)

  return (
    <TextField
      className={classes.textField}
      key={props.token}
      label={props.title}
      name={props.token}
      id={props.token}
      value={colorValue}
      readOnly
      InputProps={{
        endAdornment: props.allowedValues.includes("color") ? (
          <InputAdornment position="end">
            <ColorPicker onChange={onColorChange} value={props.value} />
          </InputAdornment>
        ) : null,
      }}
    />
  )
}

export default PropertyInput
