import { types as t } from "mobx-state-tree"
import { SaberStyles } from "store/models"
import Token from "store/models/Token"
import Color from "store/models/ValueTypes/Color"
import NumberModel from "store/models/ValueTypes/NumberModel"
import Rgb from "store/models/ValueTypes/Rgb"
import { v4 as uuidv4 } from "uuid"

import { Layer, Property } from "../BaseModels"
import BlastEffect from "../Effects/Blast"

const BlastProperty = Property.named("BlastProperty").props({
  value: t.union(
    Color,
    Rgb,
    NumberModel,
    BlastEffect,
    t.reference(Token),
    t.union(...Object.values(SaberStyles))
  ),
})

const BlastFadeout = Layer.named("BlastFadeout")
  .props({
    id: t.optional(t.identifier, () => uuidv4()),
    type: "Layer",
    title: t.optional(t.string, "BlastFadeout"),
    description:
      "Normally shows BASE, but swiches to BLAST when a blast is requested and then fades back to BASE. FADEOUT_MS specifies out many milliseconds the fade takes.",
    token: t.optional(t.string, ":layer:"),
    template: "BlastFadeoutL<:properties:>",
    properties: t.optional(t.array(BlastProperty), () => [
      BlastProperty.create({
        title: "Color A",
        token: ":colorA:",
        templateRequired: true,
        value: Color.create({ value: "White" }),
      }),
      BlastProperty.create({
        title: "Fade out time",
        token: ":fadeOutTime:",
        value: NumberModel.create({ value: 200 }),
      }),

      BlastProperty.create({
        title: "Effect type",
        token: ":effectType:",
        value: BlastEffect.create(),
      }),
    ]),
  })
  .views((self) => ({
    get subLayers() {
      return self.properties.filter((p) => p.value.type === "Style")
    },
  }))

export default BlastFadeout
