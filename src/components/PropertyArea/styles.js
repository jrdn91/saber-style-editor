import { makeStyles } from "@material-ui/core/styles"

const styles = makeStyles((theme) => ({
  propertyArea: {
    width: "50%",
    flex: "1 1 auto",
    backgroundColor: "#dadada",
    position: "relative",
    overflow: "auto",
  },
  editOpen: {
    paddingBottom: 78,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(4),
  },
}))

export default styles
