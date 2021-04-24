import ProtectedRoute from "components/ProtectedRoute"
import { Route as R } from "react-router-dom"

const Route = (route) => {
  if (route.protected) {
    return <ProtectedRoute {...route} />
  } else {
    return (
      <R
        path={route.path}
        render={(props) => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes} />
        )}
      />
    )
  }
}

export default Route
