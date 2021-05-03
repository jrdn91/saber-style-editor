import "./styles/base.css"
import "firebase/auth"

import CssBaseline from "@material-ui/core/CssBaseline"
import { MuiThemeProvider } from "@material-ui/core/styles"
import App from "components/App"
import firebase from "firebase/app"
import ReactDOM from "react-dom"
import { initDB } from "react-indexed-db"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter } from "react-router-dom"
import { FirebaseAppProvider } from "reactfire"

import reportWebVitals from "./reportWebVitals"
import theme from "./themes/main"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
}

const queryClient = new QueryClient()

initDB({
  name: "saber-style-editor-auth",
  version: 1,
  objectStoresMeta: [
    {
      store: "auth",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "token", keypath: "token" },
        { name: "account", keypath: "account" },
      ],
    },
  ],
})

const Application = (
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  </FirebaseAppProvider>
)

ReactDOM.render(Application, document.getElementById("root"))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
