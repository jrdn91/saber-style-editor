import { IconButton, Paper, Toolbar, Tooltip } from "@material-ui/core"
import CodeIcon from "@material-ui/icons/Code"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import StylesContext from "contexts/Styles"
import { observer } from "mobx-react"
import { useContext } from "react"

import useStyles from "./styles"

const Controls = ({ children }) => {
  const classes = useStyles()

  const { store } = useContext(StylesContext)

  const handleCopyCode = () => {
    const compiledCode = store.getCode()
    console.log(compiledCode)
  }

  return (
    <Toolbar variant="dense" disableGutters className={classes.controls}>
      <Tooltip title="Copy code" aria-label="add">
        <IconButton onClick={handleCopyCode} disabled={!store?.layers?.length}>
          <FileCopyIcon
            style={{
              position: "absolute",
              bottom: 10,
              right: 11,
              backgroundColor: "white",
              fontSize: 12,
            }}
          />
          <CodeIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  )
}

export default observer(Controls)
