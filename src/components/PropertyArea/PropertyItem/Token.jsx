import { Box, Typography } from "@material-ui/core"
import { ReactComponent as TokenIcon } from "assets/icons/token-icon.svg"
import ColorPicker from "components/ColorPicker"
import { getType } from "mobx-state-tree"
import React, { useMemo } from "react"

import useStyles from "./styles"

const Token = ({ propertyValue, isToken }) => {
  const classes = useStyles()

  const isColorType = useMemo(() => {
    const propertyTypeName = getType(propertyValue?.value).name
    return propertyTypeName === "Color" || propertyTypeName === "Rgb"
  }, [propertyValue])

  return (
    <>
      <Box display="flex" alignItems="center">
        <TokenIcon
          // onClick={handleEditToken}
          className={classes.tokenIcon}
        />
        <Box>
          <Typography variant="body2" className={classes.text}>
            {propertyValue?.value?.displayValue}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.text}
          >
            {propertyValue?.title}
          </Typography>
        </Box>
      </Box>
      {isColorType && (
        <ColorPicker value={propertyValue?.value} disabled={isToken} />
      )}
    </>
  )
}

export default Token
