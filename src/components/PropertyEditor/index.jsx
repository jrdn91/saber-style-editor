import { Box, Typography } from "@material-ui/core"
import StylesContext from "contexts/Styles"
import { isEmpty } from "lodash"
import { observer } from "mobx-react"
import { useContext } from "react"

import EditProperty from "./EditProperty"
import PropertyInput from "./PropertyInput"
import useStyles from "./styles"

const PropertyEditor = () => {
  const classes = useStyles()

  const { store, selectedProperty, setSelectedProperty } = useContext(
    StylesContext
  )

  const handleAreaClick = (e) => {
    setSelectedProperty()
  }

  return (
    <Box
      width="50%"
      flex="1 1 auto"
      bgcolor="#dadada"
      p={3}
      position="relative"
      onClick={handleAreaClick}
    >
      {!isEmpty(store?.selectedLayer) && (
        <>
          <Typography variant="h5" className={classes.title}>
            {store?.selectedLayer?.title}
          </Typography>
          <Box display="flex" flexDirection="column">
            {store?.selectedLayer?.properties?.map((prop) => (
              <PropertyInput key={prop.id} property={prop} />
            ))}
          </Box>
        </>
      )}
      <EditProperty
        open={selectedProperty?.value?.canEdit}
        value={selectedProperty?.value}
      />
    </Box>
  )
}

export default observer(PropertyEditor)
