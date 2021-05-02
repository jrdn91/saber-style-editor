import { FormHelperText, TextField } from "@material-ui/core"
import ColorPicker from "components/ColorPicker"
import { isEmptyArray, useFormikContext } from "formik"
import { isEmpty } from "lodash"
import { observer } from "mobx-react"
import { Observer } from "mobx-react-lite"
import { useEffect, useState } from "react"

import useStyles from "./styles"

const RgbInput = ({ value }) => {
  const classes = useStyles()

  const { setFieldError, errors } = useFormikContext()

  const [innerValue, setInnerValue] = useState("")

  useEffect(() => {
    if (!isEmpty(value?.displayValue)) {
      setInnerValue(value.displayValue)
    }
  }, [value?.displayValue])

  return (
    <>
      <TextField
        label="Rgb"
        value={innerValue}
        onChange={(e) => {
          setInnerValue(e.target.value)
          if (value.isValidRgbValue(e.target.value)) {
            setFieldError("rgb", "")
          } else {
            setFieldError("rgb", "Invalid Rgb value")
          }
        }}
        onBlur={() => {
          if (value.isValidRgbValue(innerValue)) {
            value.update(innerValue)
          }
        }}
        InputProps={{
          endAdornment: (
            <Observer>
              {() => {
                return (
                  <ColorPicker
                    onChange={(v) => {
                      console.log("v", v)
                      value.update(v)
                    }}
                    value={value}
                  />
                )
              }}
            </Observer>
          ),
        }}
      />
      <FormHelperText error>{errors.rgb || " "}</FormHelperText>
    </>
  )
}

export default observer(RgbInput)
