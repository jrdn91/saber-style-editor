import { makeStyles } from "@material-ui/core/styles"

const styles = makeStyles((theme) => ({
  buttons: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}))

export default styles
