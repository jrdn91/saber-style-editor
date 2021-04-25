import { types } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

const RgbValue = types.model({
  r: types.number,
  g: types.number,
  b: types.number,
  a: types.number,
})

const Rgb = types
  .model("Rgb", {
    id: types.optional(types.identifier, uuidv4()),
    title: types.optional(types.string, "Rgb"),
    description: types.optional(types.string, "A simple Rgb value"),
    value: types.optional(RgbValue, { r: 255, g: 0, b: 0, a: 1 }),
    token: types.optional(types.string, ":color:"),
    template: types.optional(types.string, ":color:"),
    canEdit: types.optional(types.boolean, true),
  })
  .views((self) => ({
    get displayValue() {
      return `Rgb(${self.value.r},${self.value.g},${self.value.b})`
    },
  }))
  .actions((self) => ({
    update(newValue) {
      if (typeof newValue === "string") {
        const valueParts = newValue
          .replace("Rgb(", "")
          .replace(")", "")
          .split(",")
        self.value = {
          r: parseInt(valueParts[0]),
          g: parseInt(valueParts[1]),
          b: parseInt(valueParts[2]),
          a: 1,
        }
      } else {
        self.value = newValue
      }
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

export default Rgb
