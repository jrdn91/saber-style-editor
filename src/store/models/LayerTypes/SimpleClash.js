import { types as t } from "mobx-state-tree"
import Token from "store/models/Token"
import Color from "store/models/ValueTypes/Color"
import NumberModel from "store/models/ValueTypes/NumberModel"
import Rgb from "store/models/ValueTypes/Rgb"
import { v4 as uuidv4 } from "uuid"

import { Layer, Property } from "../BaseModels"
import ClashEffect from "../Effects/Clash"
import SmoothStep from "../Functions/SmoothStep"

const Effects = {}
const effectsReq = require.context("../Effects", true, /^(.*\.(js))[^.]*$/im)
effectsReq.keys().forEach((x) => {
  const effectName = x.match(/\.\/([A-Za-z]+).js/)
  Effects[effectName[1]] = effectsReq(x).default
})

const Functions = {}
const functionsReq = require.context(
  "../Functions",
  true,
  /^(.*\.(js))[^.]*$/im
)
functionsReq.keys().forEach((x) => {
  const functionName = x.match(/\.\/([A-Za-z]+).js/)
  Functions[functionName[1]] = functionsReq(x).default
})

const SimpleClashProperty = Property.named("SimpleClashProperty").props({
  value: t.union(
    Color,
    Rgb,
    NumberModel,
    t.reference(Token),
    t.union(...Object.values(Effects)),
    t.union(...Object.values(Functions))
  ),
})

const SimpleClash = Layer.named("SimpleClash")
  .props({
    id: t.optional(t.identifier, () => uuidv4()),
    type: "Layer",
    title: t.optional(t.string, "SimpleClash"),
    description:
      "Creates a blast effect using the color BLAST when a blast is requested. The effect is basically two humps moving out from the blast location. The size of the humps can be changed with WAVE_SIZE, note that smaller values makes the humps bigger. WAVE_MS determines how fast the waves travel. Smaller values makes the waves travel slower. Finally FADEOUT_MS determines how fast the humps fade back to the base color.",
    token: t.optional(t.string, ":layer:"),
    template: "SimpleClashL<:colorA:,:clashMillis:,:effectType:,:stabShape:>",
    properties: t.optional(t.array(SimpleClashProperty), [
      SimpleClashProperty.create({
        title: "Clash color",
        token: ":colorA:",
        value: Color.create({ value: "White" }),
      }),
      SimpleClashProperty.create({
        title: "Clash milliseconds",
        token: ":clashMillis:",
        value: NumberModel.create({ value: 50 }),
      }),
      SimpleClashProperty.create({
        title: "Effect type",
        token: ":effectType:",
        value: ClashEffect.create(),
      }),
      SimpleClashProperty.create({
        title: "Stab shape",
        token: ":stabShape:",
        value: SmoothStep.create(),
      }),
    ]),
  })
  .views((self) => ({
    get subLayers() {
      return self.properties.filter((p) => p.value.type === "Style")
    },
  }))

export default SimpleClash
