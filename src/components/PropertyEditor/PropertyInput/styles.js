import { makeStyles } from "@material-ui/core/styles"

const styles = makeStyles((theme) => ({
  propertyInput: {
    borderRadius: theme.shape.borderRadius,
    padding: "0 17px",
    border: `1px solid ${theme.palette.divider}`,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    marginBottom: theme.spacing(2),
    minHeight: 48,
    backgroundColor: "#fff",
  },
  focused: {
    borderWidth: 2,
    padding: "0 16px",
    borderColor: theme.palette.primary.main,
  },
  tokenIcon: {
    height: 24,
    marginRight: theme.spacing(1),
    fill: theme.palette.primary.main,
    marginLeft: -6,
  },
}))

export default styles
