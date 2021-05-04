import LoaderButton from "@bit/c_t.components.loader-button"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  TextField as MuiTextField,
} from "@material-ui/core"
import ColorPicker from "components/ColorPicker"
import ColorDot from "components/Common/ColorDot"
import RgbInput from "components/Common/RgbInput"
import { AppContext } from "contexts/App"
import StylesContext from "contexts/Styles"
import { Field, Formik } from "formik"
import { Select, Switch, TextField } from "formik-material-ui"
import { isEmpty } from "lodash"
import { Observer } from "mobx-react"
import { clone, isType } from "mobx-state-tree"
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
  composed: Yup.boolean(),
  composition_token: Yup.string().when("composed", {
    is: true,
    then: Yup.string().required("A token to compose from is required"),
  }),
  composition_type: Yup.string().when("composed", {
    is: true,
    then: Yup.string().required("A composition type is required"),
  }),
  composition_value: Yup.number().when("composition_type", {
    is: (val) => val === "lighten" || val === "darken",
    then: Yup.number()
      .min(0, "Composition value should be between 0 and 1")
      .max(1, "Composition value should be between 0 and 1")
      .required("A composition value is required"),
  }),
  rgb: Yup.string(),
})

const ColorInput = ({ values }) => {
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Color</InputLabel>
      <Observer>
        {() => (
          <MuiSelect
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
          </MuiSelect>
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
        composed: false,
        composition_token: "",
        composition_type: "",
        composition_value: 0,
        value: {},
      }
    } else {
      return {
        title: data.title,
        composed: data.composed,
        composition_token: data.composition_token,
        composition_type: data.composition_type,
        composition_value: data.composition_value,
        value: clone(data.value),
      }
    }
  }, [data])

  const isColorValue = (values) => {
    return values?.value?.title === "Color" || values?.value?.title === "Rgb"
  }

  const isType = (values, theType) => {
    return !isEmpty(values?.value) && values?.value?.title === theType
  }

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
      }) => {
        console.log(errors)
        return (
          <Dialog
            open={open}
            onClose={handleClose}
            onExited={() => resetForm()}
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
                <FormHelperText error>{errors.value || ""}</FormHelperText>
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
              {isColorValue(values) && (
                <FormControlLabel
                  style={{ marginBottom: 16 }}
                  control={
                    <Field component={Switch} type="checkbox" name="composed" />
                  }
                  label="Compose from existing Token value"
                />
              )}
              {values.composed && (
                <>
                  <FormControl style={{ marginBottom: 16 }}>
                    <InputLabel htmlFor="composable-token-select">
                      Token to compose from
                    </InputLabel>
                    <Observer>
                      {() => (
                        <Field
                          component={Select}
                          name="composition_token"
                          inputProps={{
                            id: "composable-token-select",
                          }}
                        >
                          {store?.tokens
                            .filter(
                              (t) =>
                                t.value.title === "Color" ||
                                t.value.title === "Rgb"
                            )
                            .map((t) => (
                              <MenuItem key={t.id} value={t.id}>
                                {t.title}
                              </MenuItem>
                            ))}
                        </Field>
                      )}
                    </Observer>
                  </FormControl>
                  <FormControl style={{ marginBottom: 16 }}>
                    <InputLabel htmlFor="composition-type-select">
                      Composition type
                    </InputLabel>
                    <Field
                      component={Select}
                      name="composition_type"
                      inputProps={{
                        id: "composition-type-select",
                      }}
                    >
                      <MenuItem value="lighten">Lighten</MenuItem>
                      <MenuItem value="darken">Darken</MenuItem>
                    </Field>
                  </FormControl>
                  {(values.composition_type === "lighten" ||
                    values.composition_type === "darken") && (
                    <Field
                      style={{ marginBottom: 16 }}
                      component={TextField}
                      name="composition_value"
                      label="Composition Value"
                      type="number"
                      inputProps={{
                        step: "0.1",
                      }}
                    />
                  )}
                </>
              )}
              {!values.composed && (
                <>
                  {isType(values, "Color") && <ColorInput values={values} />}
                  {isType(values, "Rgb") && <RgbInput value={values?.value} />}
                </>
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
        )
      }}
    </Formik>
  )
}

export default EditTokenDialog
