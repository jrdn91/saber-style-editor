import LoaderButton from "@bit/c_t.components.loader-button"
import { TextField } from "@material-ui/core"
import { login } from "actions/authentication"
import { AppContext } from "contexts/App"
import { Form, Formik } from "formik"
import { useContext } from "react"
import { useMutation } from "react-query"
import { useHistory } from "react-router-dom"
import * as Yup from "yup"

import useStyles from "./styles"

const LoginForm = () => {
  const classes = useStyles()

  const authContext = useContext(AppContext)

  const loginMutation = useMutation(login)

  const loginSchema = Yup.object().shape({
    username: Yup.string().email().required("Email address is required"),
    password: Yup.string().required("Password is required"),
  })

  const history = useHistory()

  const onSubmit = (values, actions) => {
    loginMutation.mutate(values, {
      onSuccess: (res) => {
        console.log(res)
        authContext.setAuthData(res)
        history.push(history?.location?.state?.from?.pathname || "/")
      },
      onError: (err) => {
        console.error(err)
        authContext.openSnackBar({
          message: "There was an error logging in",
        })
      },
      onSettled: () => {
        actions.setSubmitting(false)
      },
    })
  }

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={loginSchema}
    >
      {({
        handleChange,
        values,
        errors,
        touched,
        handleBlur,
        isSubmitting,
        handleSubmit,
      }) => (
        <div className={classes.inputContainer}>
          <Form onSubmit={handleSubmit}>
            <TextField
              type="email"
              name="username"
              id="username"
              value={values.username}
              placeholder="Email"
              label="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.textField}
              helperText={
                touched.username && errors.username ? errors.username : " "
              }
              error={touched.username && errors.username}
              variant="outlined"
              size="small"
              fullWidth
              FormHelperTextProps={{
                className: classes.formHelperText,
              }}
            />
            <TextField
              type="password"
              name="password"
              id="password"
              value={values.password}
              placeholder="Password"
              label="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.textField}
              helperText={
                touched.password && errors.password ? errors.password : " "
              }
              error={touched.password && errors.password}
              variant="outlined"
              size="small"
              fullWidth
              FormHelperTextProps={{
                className: classes.formHelperText,
              }}
            />
            <LoaderButton
              type="submit"
              classoverrides={{
                wrapper: classes.button,
                button: {
                  root: classes.buttonRoot,
                },
              }}
              variant="contained"
              color="primary"
              working={isSubmitting}
              size="small"
              fullWidth
            >
              Sign in
            </LoaderButton>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default LoginForm
