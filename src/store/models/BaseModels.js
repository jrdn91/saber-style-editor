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
    console.group()
    console.log("Layer getCode")
    let templateString = self.template
    self.properties.forEach((property) => {
      console.log("property.token", property.token)
      templateString = templateString.replace(
        property.token,
        property.getCode()
      )
    })
    console.log("templateString", templateString)
    console.groupEnd()
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
    console.group()
    console.log("Style getCode")
    console.log("template", self.template)
    let templateString = self.template
    self.properties.forEach((property) => {
      const propertyCode = property.getCode()
      console.log("property.token", property.token)
      console.log("propertyCode", propertyCode)
      templateString = templateString.replace(property.token, propertyCode)
    })
    console.log("templateString", templateString)
    console.groupEnd()
    return templateString
  },
}))

export const Value = t.model().actions((self) => ({
  getCode() {
    console.group()
    console.log("Value getCode")
    console.log("template", self.template)
    console.log("token", self.token)
    console.log("displayValue", self.displayValue)
    console.groupEnd()
    return `${self.template.replace(self.token, self.displayValue)}`
  },
}))
