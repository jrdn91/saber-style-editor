import { types } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

const Color = types
  .model("Color", {
    id: types.optional(types.identifier, uuidv4()),
    title: types.optional(types.string, "Color"),
    description: types.optional(types.string, "A simple color value"),
    value: types.optional(types.string, "White"),
    token: types.optional(types.string, ":color:"),
    template: types.optional(types.string, ":color:"),
    canEdit: types.optional(types.boolean, true),
  })
  .views((self) => ({
    get displayValue() {
      return self.value
    },
  }))
  .actions((self) => ({
    update(newValue) {
      self.value = newValue
    },
  }))

// const ValueObject = {
//   title: "Color",
//   canEdit: true,
//   description: "A simple color value",
//   value: "White",
//   displayValue: "White",
//   token: ":color:",
//   template: ":color:",
// }

export default Color
