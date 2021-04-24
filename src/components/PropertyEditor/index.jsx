import { Box, InputAdornment, TextField, Typography } from "@material-ui/core"
import ColorPicker from "components/ColorPicker"
import StylesContext from "contexts/Styles"
import { isEmpty } from "lodash"
import { useContext, useMemo } from "react"

import PropertyInput from "./PropertyInput"
import useStyles from "./styles"

const PropertyEditor = () => {
  const classes = useStyles()

  const { styles, updateStyleProperty, selected } = useContext(StylesContext)

  const selectedStyle = useMemo(() => {
    if (!isEmpty(styles) && selected) {
      return styles.find((s) => s.id === selected)
    }
    return []
  }, [styles, selected])

  const handleSetColorValue = (prop, colorValue) => {
    updateStyleProperty(selectedStyle.id, prop.token, colorValue)
  }

  return (
    <Box width="50%" flex="1 1 auto" bgcolor="#dadada" p={3}>
      {!isEmpty(selectedStyle) && (
        <>
          <Typography variant="h5" className={classes.title}>
            {selectedStyle.title}
          </Typography>
          <Box display="flex" flexDirection="column">
            {selectedStyle.properties.map((prop) => (
              <PropertyInput
                key={prop.token}
                onColorChange={(color) => handleSetColorValue(prop, color)}
                {...prop}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  )
}

export default PropertyEditor
