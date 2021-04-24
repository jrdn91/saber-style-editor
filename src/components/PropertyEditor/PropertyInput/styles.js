import { makeStyles } from "@material-ui/core/styles"

const styles = makeStyles((theme) => ({
  propertyInput: {
    borderRadius: theme.shape.borderRadius,
    padding: "9px 17px",
    border: `1px solid ${theme.palette.divider}`,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    marginBottom: theme.spacing(2),
  },
  focused: {
    borderWidth: 2,
    padding: "8px 16px",
    borderColor: theme.palette.primary.light,
  },
}))

export default styles
