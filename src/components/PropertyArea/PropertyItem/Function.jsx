import { Box, Typography } from "@material-ui/core"
import { ReactComponent as FunctionIcon } from "assets/icons/function-icon.svg"

import useStyles from "./styles"

const FunctionComp = ({ propertyValue, isToken }) => {
  const classes = useStyles()

  return (
    <>
      <Box display="flex" alignItems="center">
        <FunctionIcon
          // onClick={handleEditToken}
          className={classes.functionIcon}
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
    </>
  )
}

export default FunctionComp
