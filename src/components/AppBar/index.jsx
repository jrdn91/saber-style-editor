import { AppBar as MuiAppBar, Button, Toolbar } from "@material-ui/core"
import App from "contexts/App"
import firebase from "firebase/app"
import { useContext } from "react"

import useStyles from "./styles"

const AppBar = ({ children }) => {
  const classes = useStyles()

  const { firebaseAuth } = useContext(App)

  console.log(firebaseAuth)

  const handleSignInWithGoogle = () => {
    if (!firebaseAuth?.isSignedIn) {
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(googleAuthProvider)
    } else {
      firebase.auth().signOut()
    }
  }

  return (
    <MuiAppBar className={classes.appBar} position="static" color="default">
      <Toolbar variant="dense" disableGutters className={classes.toolbar}>
        <Button
          size="small"
          variant="contained"
          color={firebaseAuth?.isSignedIn ? "secondary" : "primary"}
          onClick={handleSignInWithGoogle}
        >
          {firebaseAuth?.isSignedIn ? "Sign Out" : "Sign In"}
        </Button>
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar
