import { getSnapshot, types as t } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

export const Property = t
  .model("Property", {
    id: t.optional(t.identifier, () => uuidv4()),
    type: "Property",
    title: t.optional(t.string, "Property"),
    token: t.optional(t.string, ":property:"),
    templateRequired: false, // tracks if this property is required in the final template
  })
  .volatile(() => ({
    initialValue: undefined,
  }))
  .actions((self) => ({
    afterCreate() {
      console.log("afterCreated")
      self.initialValue = getSnapshot(self).value
    },
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
    let isChanged = false
    const properties = [...self.properties]
    const templifiedProps = properties
      .reverse()
      .map((property) => {
        if (isChanged) {
          // a property before this was changed so we need to templify all other properties
          // templify(property)
          return property.getCode()
        } else {
          if (property.initialValue.value !== property.value.value) {
            // property values was updated
            isChanged = true
            // templify(property)
            return property.getCode()
          } else if (property.templateRequired) {
            // templify(property)
            return property.getCode()
          } else {
            // templateString = templateString.replace(property.token, "")
            return ""
          }
        }
      })
      .filter((x) => x !== "")
    templateString = templateString.replace(
      ":properties:",
      templifiedProps.reverse().join(",")
    )
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

export const Value = t
  .model()
  .views((self) => ({
    get templateValue() {
      return self.displayValue
    },
  }))
  .actions((self) => ({
    getCode() {
      return `${self.template.replace(self.token, self.templateValue)}`
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
      return `${self.template.replace(self.token, self.value)}`
    },
  }))
