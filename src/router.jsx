import Route from "components/Route"
import NotFound from "pages/NotFound"
import { Redirect,Switch } from "react-router-dom"

const PageComponents = {}
const componentsReq = require.context("./pages", true, /^(.*\.(jsx$))[^.]*$/im)
componentsReq.keys().filter(x => x.indexOf("index.jsx") > -1).forEach(x => {
  // https://regexr.com/54uqs - selects ./ and /pages/ from file locations
  // https://regexr.com/54uqv - selects index.jsx files
  const componentName = x.replace(/\/(\w|:|-)+\.jsx$/g, "").replace(/(\/pages\/|\.\/)/g, "")
  PageComponents[componentName] = componentsReq(x).default
})
export const routeConfig = [
  {
    "path": "/",
    "exact": true,
    "component": "Index"
  },
  {
    "path": "/kitchen-sink",
    "exact": true,
    "component": "KitchenSink"
  },
  {
    "path": "/login",
    "component": "Login",
    "protected": false
  }
]
export const Router = ({ routes, match }) => {
  let path = ""
  if (match) {
    path = match.path
  }
  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={window.location.pathname.slice(0, -1)} />
      {routes.map(({ component, ...rest }, i) => (
        <Route key={i} {...rest} component={PageComponents[component]} />
      ))}
      <Route path={`${path}/*`} component={NotFound} />
    </Switch>
  )
}
export default Router
