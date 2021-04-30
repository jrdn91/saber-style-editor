import { types as t } from "mobx-state-tree"

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
