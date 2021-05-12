import { types as t } from "mobx-state-tree"
import Token from "store/models/Token"
import Color from "store/models/ValueTypes/Color"
import NumberModel from "store/models/ValueTypes/NumberModel"
import Rgb from "store/models/ValueTypes/Rgb"
import { v4 as uuidv4 } from "uuid"

import { Layer, Property } from "../BaseModels"
import BlastEffect from "../Effects/Blast"

export const SaberStyles = {}
const saberStylesReq = require.context(
  "../SaberStyles",
  true,
  /^(.*\.(js))[^.]*$/im
)
saberStylesReq.keys().forEach((x) => {
  const saberStyleName = x.match(/\.\/([A-Za-z]+).js/)
  SaberStyles[saberStyleName[1]] = saberStylesReq(x).default
})

export const ValueTypes = {}
const valueTypesReq = require.context(
  "../ValueTypes",
  true,
  /^(.*\.(js))[^.]*$/im
)
valueTypesReq.keys().forEach((x) => {
  const saberStyleName = x.match(/\.\/([A-Za-z]+).js/)
  ValueTypes[saberStyleName[1]] = valueTypesReq(x).default
})

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

const Blast = Layer.named("Blast")
  .props({
    id: t.optional(t.identifier, () => uuidv4()),
    type: "Layer",
    title: t.optional(t.string, "Blast"),
    description:
      "Creates a blast effect using the color BLAST when a blast is requested. The effect is basically two humps moving out from the blast location. The size of the humps can be changed with WAVE_SIZE, note that smaller values makes the humps bigger. WAVE_MS determines how fast the waves travel. Smaller values makes the waves travel slower. Finally FADEOUT_MS determines how fast the humps fade back to the base color.",
    token: t.optional(t.string, ":layer:"),
    template: "BlastL<:properties:>",
    properties: t.optional(t.array(BlastProperty), [
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
        title: "Wave Size",
        token: ":waveSize:",
        value: NumberModel.create({ value: 100 }),
      }),
      BlastProperty.create({
        title: "Wave Speed",
        token: ":waveSpeed:",
        value: NumberModel.create({ value: 400 }),
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

export default Blast
