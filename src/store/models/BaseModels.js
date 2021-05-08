import { types as t } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

export const Property = t
  .model("Property", {
    id: t.optional(t.identifier, () => uuidv4()),
    type: "Property",
    title: t.optional(t.string, "Property"),
    token: t.optional(t.string, ":property:"),
  })
  .actions((self) => ({
    updateValue(newValue) {
      self.value = newValue
    },
    getCode() {
      return self.value.getCode()
    },
  }))

export const Layer = t.model().actions((self) => ({
  getCode() {
    let templateString = self.template
    self.properties.forEach((property) => {
      templateString = templateString.replace(
        property.token,
        property.getCode()
      )
    })
    return templateString
  },
}))

export const Style = t.model().actions((self) => ({
  setValue(id, newValue) {
    self.properties = self.properties.map((p) => {
      if (p.id === id) {
        p.value = newValue
      }
      return p
    })
  },
  getCode() {
    let templateString = self.template
    self.properties.forEach((property) => {
      const propertyCode = property.getCode()
      templateString = templateString.replace(property.token, propertyCode)
    })
    return templateString
  },
}))

export const Value = t.model().actions((self) => ({
  getCode() {
    return `${self.template.replace(self.token, self.displayValue)}`
  },
}))

export const Effect = t
  .model("Effect", {
    id: t.optional(t.identifier, () => uuidv4()),
    type: "Effect",
    title: t.optional(t.string, "EFFECT"),
    token: ":effect:",
    template: ":effect:",
  })
  .actions((self) => ({
    getCode() {
      return self.value.getCode()
    },
  }))
