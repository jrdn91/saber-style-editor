import { FirebaseAuthConsumer } from "@react-firebase/auth"
import { isEmpty } from "lodash"
import Deferred from "promise-deferred"
import { createContext, useEffect, useRef, useState } from "react"
import { useIndexedDB } from "react-indexed-db"

export const AppContext = createContext()

export const AppContainer = ({ children }) => {
  const { add, clear, getAll } = useIndexedDB("auth")

  const [authUser, setAuthUserState] = useState(null)
  const [token, setToken] = useState(null)
  const [shouldRender, setShouldRender] = useState(false)
  const [dialogs, setDialogsState] = useState({})
  const dialogPromises = useRef({})

  const [snackBar, setSnackbar] = useState({
    open: false,
    message: "There was an error",
    autoHideDuration: 3000,
  })

  const openDialog = (name, data) => {
    setDialogsState({
      ...dialogs,
      [name]: {
        data,
        open: false,
      },
    })
    setTimeout(() => {
      setDialogsState({
        [name]: {
          ...dialogs[name],
          open: true,
        },
      })
    }, 150)
    dialogPromises.current = {
      ...dialogPromises.current,
      [name]: new Deferred(),
    }
    return dialogPromises.current[name].promise
  }

  const closeDialog = (name, confirm = false, data) => {
    // confirm is false by default so dialogs will always reject
    if (confirm) {
      dialogPromises.current[name].resolve(data)
    } else {
      dialogPromises.current[name].reject(data)
    }
    setDialogsState({
      [name]: {
        ...dialogs[name],
        open: false,
      },
    })
    setTimeout(() => {
      setDialogsState({
        [name]: {
          ...dialogs[name],
          data: {},
          open: false,
        },
      })
      delete dialogPromises.current[name]
    }, 300)
  }

  const openSnackBar = ({ open = true, ...rest }) => {
    setSnackbar({
      ...snackBar,
      ...rest,
      open,
    })
  }

  const setAuthData = ({ token, account }) => {
    clear().then(() => {
      add({ name: "token", token, account }).then(
        () => {
          setAuthUserState(account)
          setToken(token)
        },
        (error) => {
          console.log(error)
        }
      )
    })
  }

  useEffect(() => {
    // indexdb
    getAll()
      .then((res) => {
        if (!isEmpty(res)) {
          setAuthUserState(res[0].account)
          setToken(res[0].token)
        }
      })
      .finally(() => {
        setShouldRender(true)
      })
  }, [])

  return (
    <FirebaseAuthConsumer>
      {(firebaseAuth) => {
        return (
          <AppContext.Provider
            value={{
              setAuthData,
              token,
              authUser,
              dialogs,
              openDialog,
              closeDialog,
              snackBar,
              openSnackBar,
              firebaseAuth,
            }}
          >
            {shouldRender && children}
            {!shouldRender && null}
          </AppContext.Provider>
        )
      }}
    </FirebaseAuthConsumer>
  )
}
