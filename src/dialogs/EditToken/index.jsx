import LoaderButton from "@bit/c_t.components.loader-button"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core"
import { AppContext } from "contexts/App"
import StylesContext from "contexts/Styles"
import Token from "DataTypes/Token"
import { Field, Formik } from "formik"
import { TextField } from "formik-material-ui"
import { useContext, useMemo } from "react"
import * as Yup from "yup"

import useStyles from "./styles"

const schema = Yup.object({
  title: Yup.string().required("A title is required"),
  value: Yup.string().required("A value is required"),
})

const EditTokenDialog = () => {
  const classes = useStyles()

  const { dialogs, closeDialog } = useContext(AppContext)
  const { store } = useContext(StylesContext)
  const thisDialog = dialogs?.["editToken"] || {}
  const { open = false, data = null } = thisDialog

  const handleClose = () => {
    closeDialog("editToken")
  }

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false)
    if (!data) {
      const newToken = Token.create(values)
      store.addToken(newToken)
    } else {
      data.update(values)
    }
    handleClose()
  }

  const initialValues = useMemo(() => {
    console.log(data)
    if (!data) {
      console.log("no data")
      return {
        title: "",
        value: "",
      }
    } else {
      console.log(data.title)
      return {
        title: data.title,
        value: data.value,
      }
    }
  }, [data])

  console.log(initialValues)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ submitForm, isSubmitting }) => (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create new Token</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Field component={TextField} name="title" fullWidth label="Title" />
            <Field component={TextField} name="value" fullWidth label="Value" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} type="button">
              Close
            </Button>
            <LoaderButton
              working={isSubmitting}
              onClick={submitForm}
              type="button"
              variant="contained"
              color="primary"
            >
              Save
            </LoaderButton>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  )
}

export default EditTokenDialog
