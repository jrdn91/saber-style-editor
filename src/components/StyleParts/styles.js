import { makeStyles } from "@material-ui/core/styles"

const styles = makeStyles((theme) => ({
  styleParts: {
    width: "50%",
    flex: "1 1 auto",
    height: "100%",
    position: "relative",
    zIndex: 1,
    overflow: "auto",
  },
  expandIcon: {
    transform: "rotate(-90deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.sharp,
    }),
  },
  expanded: {
    transform: "rotate(0)",
  },
}))

export default styles
