import { types as t } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

import Color from "./ValueTypes/Color"
import NumberModel from "./ValueTypes/NumberModel"
import Rgb from "./ValueTypes/Rgb"

const Token = t
  .model("Token", {
    id: t.optional(t.identifier, () => uuidv4()),
    type: "Token",
    title: t.string,
    value: t.union(Rgb, Color, NumberModel),
  })
  .views((self) => ({
    get displayValue() {
      return self.value
    },
  }))
  .actions((self) => ({
    update(values) {
      Object.keys(values).forEach((key) => {
        self[key] = values[key]
      })
    },
  }))

export default Token
