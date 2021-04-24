import { makeStyles } from "@material-ui/core/styles"

const styles = makeStyles((theme) => ({
  styleParts: {
    width: "50%",
    flex: "1 1 auto",
    height: "100%",
    position: "relative",
    zIndex: 1,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

export default styles
