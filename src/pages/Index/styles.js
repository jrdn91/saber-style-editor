import { makeStyles } from "@material-ui/core/styles"

const styles = makeStyles((theme) => ({
  mainPageArea: {
    flexGrow: 1,
    display: "flex",
    overflow: "hidden",
  },
  buttons: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}))

export default styles
