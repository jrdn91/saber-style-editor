import { Box, InputAdornment, TextField, Typography } from "@material-ui/core"
import ColorPicker from "components/ColorPicker"
import StylesContext from "contexts/Styles"
import { isEmpty } from "lodash"
import { useContext, useMemo } from "react"

import EditProperty from "./EditProperty"
import PropertyInput from "./PropertyInput"
import useStyles from "./styles"

const PropertyEditor = () => {
  const classes = useStyles()

  const {
    styles,
    updateStyleProperty,
    selectedStyle,
    selectedProperty,
  } = useContext(StylesContext)

  const selectedStyleFromList = useMemo(() => {
    if (!isEmpty(styles) && selectedStyle) {
      return styles.find((s) => s.id === selectedStyle)
    }
    return []
  }, [styles, selectedStyle])

  const handleSetColorValue = (prop, colorValue) => {
    updateStyleProperty(selectedStyleFromList.id, prop.token, colorValue)
  }

  const selectedPropertyObject = useMemo(() => {
    if (selectedProperty === undefined) return
    const propertyObject = selectedStyleFromList?.properties?.find(
      (p) => p.token === selectedProperty
    )
    return propertyObject
  }, [selectedProperty, selectedStyleFromList.properties])

  const canEditSelectedProperty = useMemo(() => {
    if (selectedPropertyObject) {
      return selectedPropertyObject.value.canEdit
    }
    return false
  }, [selectedPropertyObject])

  const handleSavePropertyValue = (newValue) => {
    console.log(newValue)
  }

  return (
    <Box
      width="50%"
      flex="1 1 auto"
      bgcolor="#dadada"
      p={3}
      position="relative"
    >
      {!isEmpty(selectedStyleFromList) && (
        <>
          <Typography variant="h5" className={classes.title}>
            {selectedStyleFromList.title}
          </Typography>
          <Box display="flex" flexDirection="column">
            {selectedStyleFromList.properties.map((prop) => (
              <PropertyInput
                key={prop.token}
                onColorChange={(color) => handleSetColorValue(prop, color)}
                {...prop}
              />
            ))}
          </Box>
        </>
      )}
      <EditProperty
        open={canEditSelectedProperty}
        value={selectedPropertyObject?.value?.value}
        onSave={handleSavePropertyValue}
      />
    </Box>
  )
}

export default PropertyEditor
