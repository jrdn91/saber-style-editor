import { Snackbar as MUISnackbar } from "@material-ui/core"
import { AppContext } from "contexts/App"
import useWidth from "hooks/useWidth"
import { useContext, useMemo } from "react"

const Snackbar = () => {
  const width = useWidth()

  const { snackBar, openSnackBar } = useContext(AppContext)

  const snackBarOrigin = useMemo(() => {
    return width === "sm" || width === "xs"
      ? { vertical: "bottom", horizontal: "left" }
      : { vertical: "bottom", horizontal: "left" }
  }, [width])

  const { message, ...rest } = snackBar

  return (
    <MUISnackbar
      anchorOrigin={snackBarOrigin}
      onClose={() => openSnackBar({ open: false })}
      ContentProps={{
        "aria-describedby": "message-id",
      }}
      message={<span id="message-id">{message}</span>}
      {...rest}
    />
  )
}

export default Snackbar
