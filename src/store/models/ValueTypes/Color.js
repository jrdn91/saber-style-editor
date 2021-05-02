import { types } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

import { Value } from "../BaseModels"

const Color = Value.named("Color")
  .props({
    id: types.optional(types.identifier, () => uuidv4()),
    type: "Value",
    title: types.optional(types.string, "Color"),
    description: types.optional(types.string, "A simple color value"),
    value: types.optional(types.string, "White"),
    token: types.optional(types.string, ":color:"),
    template: types.optional(types.string, ":color:"),
    canEdit: false,
  })
  .views((self) => ({
    get displayValue() {
      return self.value
    },
    get valueToString() {
      // view to match rgb view value
      return self.value
    },
  }))
  .actions((self) => ({
    update(newValue) {
      self.value = newValue
    },
  }))

export default Color
