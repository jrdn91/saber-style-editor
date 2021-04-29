import { types } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

const Number = types
  .model("Number", {
    id: types.optional(types.identifier, () => uuidv4()),
    type: "Value",
    title: types.optional(types.string, "Number"),
    description: types.optional(types.string, "A simple number value"),
    value: types.optional(types.number, 50),
    token: types.optional(types.string, ":number:"),
    template: types.optional(types.string, ":number:"),
    canEdit: types.optional(types.boolean, true),
  })
  .views((self) => ({
    get displayValue() {
      return self.value
    },
  }))
  .actions((self) => ({
    update(newValue) {
      self.value = parseInt(newValue)
    },
    getCode() {
      return `${self.template.replace(self.token, self.displayValue)}`
    },
  }))

export default Number
