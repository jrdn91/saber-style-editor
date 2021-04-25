import { makeStyles } from "@material-ui/core/styles"

const styles = makeStyles((theme) => ({
  accordionDetails: {
    flexDirection: "column",
    padding: theme.spacing(1, 0, 2),
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
