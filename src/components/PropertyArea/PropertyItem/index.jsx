import { Box, Typography } from "@material-ui/core"
import classnames from "clsx"
import ColorPicker from "components/ColorPicker"
import ErrorFallback from "components/Common/ErrorFallback"
import { AppContext } from "contexts/App"
import StylesContext from "contexts/Styles"
import { observer } from "mobx-react"
import { getType } from "mobx-state-tree"
import { useContext, useMemo } from "react"
import { ErrorBoundary } from "react-error-boundary"
import Rgb from "store/models/ValueTypes/Rgb"

import Effect from "./Effect"
import Function from "./Function"
import useStyles from "./styles"
import Token from "./Token"
import Value from "./Value"

const PropertyTypes = {
  Value,
  Token,
  Function,
  Effect,
}

const PropertyItem = ({ property }) => {
  const classes = useStyles()

  const { selectedProperty, setSelectedProperty } = useContext(StylesContext)

  const isToken = useMemo(() => {
    const propertyTypeName = getType(property?.value).name
    return propertyTypeName === "Token"
  }, [property?.value])

  const isSelected = useMemo(() => {
    if (selectedProperty === undefined) return
    return selectedProperty === property
  }, [selectedProperty, property])

  const handleInputClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedProperty(property)
  }

  const ContentComponent = PropertyTypes[property?.value?.type] || null

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Typography variant="body2" style={{ marginBottom: 4 }}>
        {property?.title}
      </Typography>
      <Box
        className={classnames(classes.propertyItem, {
          [classes.focused]: isSelected,
        })}
        onClick={handleInputClick}
      >
        {ContentComponent && (
          <ContentComponent propertyValue={property?.value} isToken={isToken} />
        )}
      </Box>
    </ErrorBoundary>
  )
}

export default observer(PropertyItem)
