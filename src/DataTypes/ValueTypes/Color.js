import { types } from "mobx-state-tree"

import BaseValue from "./BaseValue"

const Color = types.compose(BaseValue, types.model("Color"))

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
