import { Box, Typography } from "@material-ui/core"
import classnames from "clsx"
import ErrorFallback from "components/Common/ErrorFallback"
import StylesContext from "contexts/Styles"
import { isEmpty } from "lodash"
import { observer } from "mobx-react"
import { useContext } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { AutoSizer } from "react-virtualized"

import PropertyInput from "./PropertyInput"
import PropertyItem from "./PropertyItem"
import useStyles from "./styles"

const PropertyArea = () => {
  const classes = useStyles()

  const { store, selectedProperty, setSelectedProperty } = useContext(
    StylesContext
  )

  const handleAreaClick = (e) => {
    setSelectedProperty()
  }

  return (
    <Box
      className={classnames(classes.propertyArea, {
        [classes.editOpen]: selectedProperty?.value?.canEdit,
      })}
      onClick={handleAreaClick}
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Box p={3}>
          {!isEmpty(store?.selectedLayer) && (
            <>
              <Typography variant="h5" className={classes.title}>
                {store?.selectedLayer?.title}
              </Typography>
              <Box display="flex" flexDirection="column">
                {store?.selectedLayer?.properties?.map((prop) => (
                  <PropertyItem key={prop.id} property={prop} />
                ))}
              </Box>
            </>
          )}
        </Box>
        <AutoSizer disableHeight style={{ width: "100%" }}>
          {({ width }) => (
            <PropertyInput
              width={width}
              open={
                selectedProperty?.type !== "Token" &&
                selectedProperty?.value?.canEdit
              }
              value={selectedProperty?.value}
            />
          )}
        </AutoSizer>
      </ErrorBoundary>
    </Box>
  )
}

export default observer(PropertyArea)
