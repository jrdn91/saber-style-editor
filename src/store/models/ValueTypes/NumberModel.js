import { types } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

import { Value } from "../BaseModels"

const NumberModel = Value.named("Number")
  .props({
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
      console.log(self.value)
      return self.value
    },
  }))
  .actions((self) => ({
    update(newValue) {
      console.log(parseInt(newValue))
      self.value = parseInt(newValue)
    },
  }))

export default NumberModel
