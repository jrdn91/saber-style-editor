import { types } from "mobx-state-tree"

import BaseValue from "./BaseValue"

const Rgb = types.compose(
  BaseValue,
  types.model("Rgb").views((self) => ({
    get displayValue() {
      return `Rgb(${self.value.r},${self.value.g},${self.value.b})`
    },
  }))
)

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
