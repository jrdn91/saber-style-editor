import {
  Box,
  Button,
  Collapse,
  FormHelperText,
  OutlinedInput,
  Paper,
} from "@material-ui/core"
import StylesContext from "contexts/Styles"
import { observer } from "mobx-react"
import { useContext, useEffect, useState } from "react"

import useStyles from "./styles"

const PropertyInput = ({ value, open = false, width = 0 }) => {
  const classes = useStyles()

  const { setSelectedProperty } = useContext(StylesContext)

  const [innerValue, setInnerValue] = useState("")

  useEffect(() => {
    setInnerValue(value?.displayValue || "")
  }, [value?.displayValue])

  const handleOnChange = (e) => {
    setInnerValue(e.target.value)
  }

  const handleSave = () => {
    value.update(innerValue)
    setSelectedProperty()
  }

  const handleCollapseClick = (e) => {
    // prevents clicking inside edit property area from triggering "outside click" functionality
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <Collapse
      style={{ width }}
      in={open}
      className={classes.collapse}
      onClick={handleCollapseClick}
    >
      <Paper elevation={1} square className={classes.propertyInput}>
        <Box>
          <OutlinedInput
            margin="dense"
            value={innerValue}
            onChange={handleOnChange}
          />
          <FormHelperText error>
            {innerValue === "" ? "A value is required" : " "}
          </FormHelperText>
        </Box>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={handleSave}
          disabled={innerValue === value?.displayValue || !innerValue}
        >
          Save
        </Button>
      </Paper>
    </Collapse>
  )
}

export default observer(PropertyInput)
