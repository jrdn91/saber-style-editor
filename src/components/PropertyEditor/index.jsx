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

  const { store, selectedProperty } = useContext(StylesContext)

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
      {!isEmpty(store?.selectedLayer) && (
        <>
          <Typography variant="h5" className={classes.title}>
            {store?.selectedLayer?.title}
          </Typography>
          <Box display="flex" flexDirection="column">
            {store?.selectedLayer?.properties?.map((prop) => (
              <PropertyInput
                key={prop.id}
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
