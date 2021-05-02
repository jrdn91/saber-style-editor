import { types } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

import { Value } from "../BaseModels"

const RgbValue = types.model({
  r: types.number,
  g: types.number,
  b: types.number,
  a: types.number,
})

const Rgb = Value.named("Rgb")
  .props({
    id: types.optional(types.identifier, () => uuidv4()),
    type: "Value",
    title: types.optional(types.string, "Rgb"),
    description: types.optional(types.string, "A simple Rgb value"),
    value: types.optional(RgbValue, { r: 255, g: 0, b: 0, a: 1 }),
    token: types.optional(types.string, ":color:"),
    template: types.optional(types.string, ":color:"),
    canEdit: types.optional(types.boolean, true),
  })
  .views((self) => ({
    get displayValue() {
      return `Rgb<${self.value.r},${self.value.g},${self.value.b}>`
    },
    get valueToString() {
      return `rgb(${self.value.r},${self.value.g},${self.value.b})`
    },
  }))
  .actions((self) => ({
    update(newValue) {
      console.log("newValue", newValue)
      if (typeof newValue === "string") {
        const valueParts = newValue
          .replace("Rgb<", "")
          .replace(">", "")
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
    isValidRgbValue(value) {
      return value.match(/^Rgb<[\d]{1,3},[\d]{1,3},[\d]{1,3}>$/g) !== null
    },
  }))

export default Rgb
