import { Box, Typography } from "@material-ui/core"
import classnames from "clsx"
import StylesContext from "contexts/Styles"
import { isEmpty } from "lodash"
import { observer } from "mobx-react"
import { useContext } from "react"
import { AutoSizer } from "react-virtualized"

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
      className={classnames(classes.propertyEditor, {
        [classes.editOpen]: selectedProperty?.value?.canEdit,
      })}
      onClick={handleAreaClick}
    >
      <Box p={3}>
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
      </Box>
      <AutoSizer disableHeight style={{ width: "100%" }}>
        {({ width }) => (
          <EditProperty
            width={width}
            open={selectedProperty?.value?.canEdit}
            value={selectedProperty?.value}
          />
        )}
      </AutoSizer>
    </Box>
  )
}

export default observer(PropertyEditor)
