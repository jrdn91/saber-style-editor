import Snackbar from "components/Snackbar"
import { AppContainer } from "contexts/App"
import CopyCodeDialog from "dialogs/CopyCode"
import { withRouter } from "react-router"
import Router, { routeConfig } from "router"

import useStyles from "./styles"

const App = () => {
  const { classes } = useStyles()

  return (
    <AppContainer>
      <Router routes={routeConfig} />
      <div id="dialog-holder">
        {/* LEAVE THIS IN PLACE FOR DIALOGS TO POPULATE INTO */}
        <CopyCodeDialog />
      </div>
      <Snackbar />
    </AppContainer>
  )
}

export default withRouter(App)
