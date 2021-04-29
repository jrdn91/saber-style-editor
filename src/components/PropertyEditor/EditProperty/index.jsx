import {
  Box,
  Button,
  Collapse,
  FormHelperText,
  OutlinedInput,
  Paper,
} from "@material-ui/core"
import StylesContext from "contexts/Styles"
import { useContext, useEffect, useState } from "react"

import useStyles from "./styles"

const EditProperty = ({ value, open = false }) => {
  const classes = useStyles()

  const { setSelectedProperty } = useContext(StylesContext)

  const [innerValue, setInnerValue] = useState("")

  useEffect(() => {
    if (value?.displayValue) {
      setInnerValue(value?.displayValue)
    }
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
      in={open}
      className={classes.collapse}
      onClick={handleCollapseClick}
    >
      <Paper elevation={1} square className={classes.editProperty}>
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
        >
          Save
        </Button>
      </Paper>
    </Collapse>
  )
}

export default EditProperty
