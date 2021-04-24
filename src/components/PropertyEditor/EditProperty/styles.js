import { makeStyles } from "@material-ui/core/styles"

const styles = makeStyles((theme) => ({
  collapse: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
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
