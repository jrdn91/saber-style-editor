import { Box, Typography } from "@material-ui/core"
import { ReactComponent as TokenIcon } from "assets/icons/token-icon.svg"
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

import useStyles from "./styles"

const InputComponent = ({ isToken, propertyValue }) => {
  const classes = useStyles()

  const { openDialog } = useContext(AppContext)
  const { selectedProperty, setSelectedProperty } = useContext(StylesContext)

  const isSelected = useMemo(() => {
    if (selectedProperty === undefined) return
    return selectedProperty === propertyValue
  }, [selectedProperty, propertyValue])

  const handleInputClick = (e) => {
    // prevents clicking inside property input from triggering "outside click" functionality
    e.preventDefault()
    e.stopPropagation()
    setSelectedProperty(propertyValue)
  }

  const handleEditToken = (e) => {
    e.preventDefault()
    e.stopPropagation()
    openDialog("editToken", propertyValue)
  }

  const handleColorChange = (color) => {
    if (propertyValue.value.title === "Color") {
      // if is color, change to Rgb
      const rgbColor = Rgb.create({
        value: color,
      })
      propertyValue.updateValue(rgbColor)
    } else {
      propertyValue.value.update(color)
    }
  }

  const isColorType = useMemo(() => {
    const propertyTypeName = getType(propertyValue?.value).name
    return propertyTypeName === "Color" || propertyTypeName === "Rgb"
  }, [propertyValue?.value])

  return (
    <Box
      className={classnames(classes.propertyInput, {
        [classes.focused]: isSelected,
      })}
      onClick={handleInputClick}
    >
      <Box display="flex" alignItems="center">
        {isToken && (
          <TokenIcon onClick={handleEditToken} className={classes.tokenIcon} />
        )}
        <div>
          <Typography
            variant="body2"
            style={{ fontSize: "0.8rem", lineHeight: "1rem" }}
          >
            {isToken
              ? propertyValue?.title
              : propertyValue?.value?.displayValue}
          </Typography>
          {isToken && (
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ fontSize: "0.8rem", lineHeight: "1rem" }}
            >
              {propertyValue?.value?.displayValue}
            </Typography>
          )}
        </div>
      </Box>
      {isColorType && (
        <ColorPicker
          onChange={handleColorChange}
          value={propertyValue?.value}
          disabled={isToken}
        />
      )}
    </Box>
  )
}

const PropertyInput = ({ property }) => {
  const isToken = useMemo(() => {
    const propertyTypeName = getType(property?.value).name
    return propertyTypeName === "Token"
  }, [property?.value])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <InputComponent
        isToken={isToken}
        propertyValue={isToken ? property?.value : property}
      />
    </ErrorBoundary>
  )
}

export default observer(PropertyInput)
