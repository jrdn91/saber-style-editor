import { types as t } from "mobx-state-tree"
import Token from "store/models/Token"
import Color from "store/models/ValueTypes/Color"
import NumberType from "store/models/ValueTypes/Number"
import Rgb from "store/models/ValueTypes/Rgb"
import { v4 as uuidv4 } from "uuid"

import { Property, Style } from "../BaseModels"

const BrownNoiseFlickerProperty = Property.named(
  "BrownNoiseFlickerProperty"
).props({
  value: t.union(Color, Rgb, NumberType, t.reference(Token)),
})

const BrownNoiseFlicker = Style.named("BrownNoiseFlicker").props({
  id: t.optional(t.identifier, () => uuidv4()),
  type: "Style",
  title: t.optional(t.string, "BrownNoiseFlicker"),
  description: t.optional(
    t.string,
    "Randomly selects between A and B, but keeps nearby pixels looking similar."
  ),
  template: t.optional(
    t.string,
    "BrownNoiseFlicker<:colorA:,:colorB:,:grade:>"
  ),
  properties: t.optional(t.array(BrownNoiseFlickerProperty), [
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
