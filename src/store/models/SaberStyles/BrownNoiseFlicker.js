import { types } from "mobx-state-tree"
import Token from "store/models/Token"
import Color from "store/models/ValueTypes/Color"
import NumberType from "store/models/ValueTypes/Number"
import Rgb from "store/models/ValueTypes/Rgb"
import { v4 as uuidv4 } from "uuid"

import { Style } from "../BaseModels"

const BrownNoiseFlickerProperty = types
  .model("BrownNoiseFlickerProperty", {
    id: types.optional(types.identifier, () => uuidv4()),
    type: "Property",
    title: types.optional(types.string, "Property"),
    token: types.optional(types.string, ":property:"),
    value: types.union(Color, Rgb, NumberType, types.reference(Token)),
  })
  .actions((self) => ({
    updateValue(newValue) {
      self.value = newValue
    },
    getCode() {
      return self.value.getCode()
    },
  }))

const BrownNoiseFlicker = Style.named("BrownNoiseFlicker").props({
  id: types.optional(types.identifier, () => uuidv4()),
  type: "Style",
  title: types.optional(types.string, "BrownNoiseFlicker"),
  description: types.optional(
    types.string,
    "Randomly selects between A and B, but keeps nearby pixels looking similar."
  ),
  template: types.optional(
    types.string,
    "BrownNoiseFlicker<:colorA:,:colorB:,:grade:>"
  ),
  properties: types.optional(types.array(BrownNoiseFlickerProperty), [
    BrownNoiseFlickerProperty.create({
      title: "Color A",
      token: ":colorA:",
      value: Color.create({ value: "Green" }),
    }),
    BrownNoiseFlickerProperty.create({
      title: "Color B",
      token: ":colorB:",
      value: Color.create({ value: "Magenta" }),
    }),
    BrownNoiseFlickerProperty.create({
      title: "Grade",
      token: ":grade:",
      value: NumberType.create({ value: 50 }),
    }),
  ]),
})

export default BrownNoiseFlicker
