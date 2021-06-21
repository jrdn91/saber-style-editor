import { makeStyles } from "@material-ui/core/styles"

const styles = makeStyles((theme) => ({
  accordionMenu: {
    height: "100%",
    width: "100%",
    maxWidth: "320px",
    flexShrink: 0,
    backgroundColor: "#fff",
    overflow: "auto",
    position: "relative",
    zIndex: 3,
  },
  accordionDetails: {
    flexDirection: "column",
    padding: theme.spacing(0, 0, 2),
  },
  listSecondaryAction: {
    marginRight: theme.spacing(0.5),
  },
  list: {
    width: "100%",
  },
  tokenListItem: {
    "& .MuiIconButton-root": {
      opacity: 0,
    },
    "&:hover": {
      "& .MuiIconButton-root": {
        opacity: 1,
      },
    },
  },
  confirmButton: {
    color: theme.palette.error.main,
  },
}))

export default styles
