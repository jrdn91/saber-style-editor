import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core"
import { AppContext } from "contexts/App"
import { useContext } from "react"

import useStyles from "./styles"

const CopyCodeDialog = () => {
  const classes = useStyles()

  const { dialogs, closeDialog, openSnackBar } = useContext(AppContext)
  const thisDialog = dialogs?.["copyCode"] || {}
  const { open = false, data = {} } = thisDialog

  const handleClose = () => {
    closeDialog("copyCode")
  }

  const handleCopyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(data?.code || "")
      openSnackBar({
        message: "Style has been copied to your clipboard",
      })
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Copy Code</DialogTitle>
      <DialogContent>
        <TextField
          label="Saber Style Code"
          name="saber-code"
          fullWidth
          multiline
          rows={6}
          value={data?.code || ""}
          readonly
          variant="outlined"
          onFocus={handleCopyToClipboard}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose} type="button">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CopyCodeDialog
