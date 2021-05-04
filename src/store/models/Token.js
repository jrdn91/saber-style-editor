import C from "color"
import { getParent, onPatch, types as t } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

import Color from "./ValueTypes/Color"
import NumberModel from "./ValueTypes/NumberModel"
import Rgb from "./ValueTypes/Rgb"

const handleComposition = (composedToken, self) => {
  if (composedToken) {
    if (composedToken.value.title === "Rgb") {
      const { a, ...rgb } = composedToken.value.value
      const composedTokenColor = C(rgb)
      let newColorValue
      if (self.composition_type === "lighten") {
        newColorValue = composedTokenColor
          .lighten(self.composition_value)
          .rgb()
          .object()
      } else if (self.composition_type === "darken") {
        newColorValue = composedTokenColor
          .darken(self.composition_value)
          .rgb()
          .object()
      }
      self.value.update({
        r: parseInt(newColorValue.r),
        g: parseInt(newColorValue.g),
        b: parseInt(newColorValue.b),
        a: 1,
      })
    }
  }
}

const Token = t
  .model("Token", {
    id: t.optional(t.identifier, () => uuidv4()),
    type: "Token",
    title: t.string,
    composed: false,
    composition_token: t.optional(t.string, ""), // the token to compose a value from
    composition_type: "",
    composition_value: 0,
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
      // rerun composition just in case
      if (self.composed) {
        const composedToken = getParent(self, 2).tokens.find(
          (t) => t.id === self.composition_token
        )
        handleComposition(composedToken, self)
      }
    },
    afterAttach() {
      if (self.composed) {
        const composedToken = getParent(self, 2).tokens.find(
          (t) => t.id === self.composition_token
        )
        handleComposition(composedToken, self)
        onPatch(composedToken, (patch) =>
          handleComposition(composedToken, self)
        )
      }
    },
  }))

export default Token
