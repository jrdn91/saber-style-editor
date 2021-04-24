import { Box } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import LoginForm from "components/Forms/LoginForm"
import Page from "pages/Page"

import styles from "./styles"
import useStyles from "./styles"

const Index = () => {
  const classes = useStyles()

  return (
    <Page>
      <Box
        height="100vh"
        width="100vw"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <LoginForm />
      </Box>
    </Page>
  )
}

export default withStyles(styles)(Index)
