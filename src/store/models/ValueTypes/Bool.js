import { types } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

import { Value } from "../BaseModels"

const Bool = Value.named("Bool")
  .props({
    id: types.optional(types.identifier, () => uuidv4()),
    type: "Value",
    title: types.optional(types.string, "Bool"),
    description: types.optional(types.string, "A simple boolean value"),
    value: types.optional(types.boolean, false),
    token: types.optional(types.string, ":bool:"),
    template: types.optional(types.string, ":bool:"),
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

export default Bool
