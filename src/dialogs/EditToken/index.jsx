import LoaderButton from "@bit/c_t.components.loader-button"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField as MuiTextField,
} from "@material-ui/core"
import ColorPicker from "components/ColorPicker"
import ColorDot from "components/Common/ColorDot"
import RgbInput from "components/Common/RgbInput"
import { AppContext } from "contexts/App"
import StylesContext from "contexts/Styles"
import { Field, Formik } from "formik"
import { TextField } from "formik-material-ui"
import { isEmpty } from "lodash"
import { Observer } from "mobx-react"
import { clone } from "mobx-state-tree"
import { useContext, useEffect, useMemo, useState } from "react"
import Colors from "store/models/Colors"
import Token from "store/models/Token"
import Color from "store/models/ValueTypes/Color"
import NumberModel from "store/models/ValueTypes/NumberModel"
import Rgb from "store/models/ValueTypes/Rgb"
import * as Yup from "yup"

import useStyles from "./styles"

const schema = Yup.object({
  title: Yup.string().required("A title is required"),
  value: Yup.object().required("A value is required"),
  rgb: Yup.string(),
})

const ColorInput = ({ values }) => {
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Color</InputLabel>
      <Observer>
        {() => (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={values?.value.displayValue}
            onChange={(e) =>
              values?.value.update(
                Colors.find((c) => c.value === e.target.value).value
              )
            }
            classes={{
              select: classes.select,
            }}
          >
            {Colors.map((c) => (
              <MenuItem
                style={{ display: "flex", alignItems: "center" }}
                key={c.value}
                value={c.value}
              >
                {c.value}{" "}
                <span style={{ marginLeft: 16 }}>
                  <ColorDot color={c.background} />
                </span>
              </MenuItem>
            ))}
          </Select>
        )}
      </Observer>
    </FormControl>
  )
}

const EditTokenDialog = () => {
  const classes = useStyles()

  const { dialogs, closeDialog } = useContext(AppContext)
  const { store } = useContext(StylesContext)
  const thisDialog = dialogs?.["editToken"] || {}
  const { open = false, data = null } = thisDialog

  const handleClose = () => {
    closeDialog("editToken")
  }

  const handleSubmit = ({ rgb, ...values }, actions) => {
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
    if (!data || isEmpty(data)) {
      return {
        title: "",
        value: {},
      }
    } else {
      return {
        title: data.title,
        value: clone(data.value),
      }
    }
  }, [data])

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        submitForm,
        isSubmitting,
        setFieldValue,
        isValid,
        resetForm,
      }) => (
        <Dialog
          open={open}
          onClose={handleClose}
          onEmptied={() => resetForm()}
          keepMounted={false}
        >
          <DialogTitle>Create new Token</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Field
              component={TextField}
              autoComplete="off"
              name="title"
              fullWidth
              label="Title"
            />
            <FormLabel style={{ marginTop: 24, marginBottom: 8 }}>
              Token type
            </FormLabel>
            <Box marginLeft={-1} marginBottom={2}>
              <Box display="flex">
                <Button
                  onClick={() => {
                    const newValue = Color.create()
                    setFieldValue("value", newValue)
                  }}
                  variant={
                    values?.value?.title === "Color" ? "contained" : "text"
                  }
                  color="primary"
                >
                  Color
                </Button>
                <Button
                  onClick={() => {
                    const newValue = Rgb.create({
                      value: { r: 100, g: 100, b: 100, a: 1 },
                    })
                    setFieldValue("value", newValue)
                  }}
                  variant={
                    values?.value?.title === "Rgb" ? "contained" : "text"
                  }
                  color="primary"
                >
                  Rgb
                </Button>
                <Button
                  onClick={() => {
                    const newValue = NumberModel.create()
                    setFieldValue("value", newValue)
                  }}
                  variant={
                    values?.value?.title === "Number" ? "contained" : "text"
                  }
                  color="primary"
                >
                  Number
                </Button>
              </Box>
              <FormHelperText error>{errors.value || " "}</FormHelperText>
            </Box>
            {!isEmpty(values?.value) && values?.value?.title === "Number" && (
              <Observer>
                {() => (
                  <MuiTextField
                    label="Value"
                    value={values?.value.displayValue}
                    fullWidth
                    type="number"
                    onChange={(e) => values?.value?.update?.(e.target.value)}
                  />
                )}
              </Observer>
            )}
            {!isEmpty(values?.value) && values?.value?.title === "Color" && (
              <ColorInput values={values} />
            )}
            {!isEmpty(values?.value) && values?.value?.title === "Rgb" && (
              <RgbInput value={values?.value} />
            )}
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
              disabled={!isValid}
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
