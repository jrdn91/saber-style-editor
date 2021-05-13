import { Box, Typography } from "@material-ui/core"

import useStyles from "./styles"

const Style = ({ propertyValue, isToken }) => {
  const classes = useStyles()

  return (
    <>
      <Box display="flex" alignItems="center">
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

export default Style
