import { makeStyles } from "@material-ui/core/styles"

const styles = makeStyles((theme) => ({
  collapse: {
    position: "fixed",
    bottom: 0,
    right: 0,
  },
  editProperty: {
    display: "flex",
    padding: theme.spacing(2),
    paddingBottom: 0,
    justifyContent: "space-between",
    alignItems: "baseline",
  },
}))

export default styles
