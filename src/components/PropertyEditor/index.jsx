import { Box, Typography } from "@material-ui/core"
import StylesContext from "contexts/Styles"
import { isEmpty } from "lodash"
import { observer } from "mobx-react"
import { useContext, useMemo } from "react"

import EditProperty from "./EditProperty"
import PropertyInput from "./PropertyInput"
import useStyles from "./styles"

const PropertyEditor = () => {
  const classes = useStyles()

  const { selectedStyle, selectedProperty } = useContext(StylesContext)

  console.log({ selectedStyle })

  // const selectedPropertyObject = useMemo(() => {
  //   if (selectedProperty === undefined) return
  //   const propertyObject = selectedStyle?.properties?.find(
  //     (p) => p.token === selectedProperty
  //   )
  //   return propertyObject
  // }, [selectedProperty, selectedStyle])

  // const canEditSelectedProperty = useMemo(() => {
  //   if (selectedPropertyObject) {
  //     return selectedPropertyObject.value.canEdit
  //   }
  //   return false
  // }, [selectedPropertyObject])

  const handleSavePropertyValue = (newValue) => {
    console.log(newValue)
  }

  const handleSetColorValue = (color) => {
    console.log(color)
  }

  return (
    <Box
      width="50%"
      flex="1 1 auto"
      bgcolor="#dadada"
      p={3}
      position="relative"
    >
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
                property={prop}
              />
            ))}
          </Box>
        </>
      )}
      <EditProperty
        open={selectedProperty?.value?.canEdit}
        value={selectedProperty?.value}
        onSave={handleSavePropertyValue}
      />
    </Box>
  )
}

export default observer(PropertyEditor)
