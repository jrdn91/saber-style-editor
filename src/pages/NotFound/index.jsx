import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import animationData from "assets/404-lottie.json"
import { Component } from "react"
import Lottie from "react-lottie"

import styles from "./styles"

console.log(animationData)

class NotFound extends Component {
  render() {
    const { classes } = this.props
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    }
    return (
      <section className={classes.notFound}>
        <Lottie options={defaultOptions} height={400} width={400} />
        <div className={classes.textSection}>
          <Typography variant="h2" className={classes.text}>
            No page matching that url
          </Typography>
        </div>
      </section>
    )
  }
}

export default withStyles(styles)(NotFound)
