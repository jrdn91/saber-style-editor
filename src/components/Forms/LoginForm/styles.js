import { makeStyles } from "@material-ui/core/styles"

const styles = makeStyles((theme) => ({
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    maxWidth: 320,
  },
  formHelperText: {
    marginLeft: 0,
  },
  textField: {
    marginBottom: theme.spacing(1),
  },
}))

export default styles
