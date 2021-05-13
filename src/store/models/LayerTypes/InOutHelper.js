import { types as t } from "mobx-state-tree"
import Token from "store/models/Token"
import Color from "store/models/ValueTypes/Color"
import NumberModel from "store/models/ValueTypes/NumberModel"
import Rgb from "store/models/ValueTypes/Rgb"
import { v4 as uuidv4 } from "uuid"

import { Layer, Property } from "../BaseModels"
import InOutFunc from "../Functions/InOutFunc"
import Bool from "../ValueTypes/Bool"

const SaberStyles = {}
const saberStylesReq = require.context(
  "../SaberStyles",
  true,
  /^(.*\.(js))[^.]*$/im
)
saberStylesReq.keys().forEach((x) => {
  const saberStyleName = x.match(/\.\/([A-Za-z]+).js/)
  SaberStyles[saberStyleName[1]] = saberStylesReq(x).default
})

const Functions = {}
const functionsReq = require.context(
  "../Functions",
  true,
  /^(.*\.(js))[^.]*$/im
)
functionsReq.keys().forEach((x) => {
  const funcName = x.match(/\.\/([A-Za-z]+).js/)
  Functions[funcName[1]] = functionsReq(x).default
})

const ValueTypes = {}
const valueTypesReq = require.context(
  "../ValueTypes",
  true,
  /^(.*\.(js))[^.]*$/im
)
valueTypesReq.keys().forEach((x) => {
  const saberStyleName = x.match(/\.\/([A-Za-z]+).js/)
  ValueTypes[saberStyleName[1]] = valueTypesReq(x).default
})

const InOutHelperProperty = Property.named("InOutHelperProperty").props({
  value: t.union(
    Color,
    Rgb,
    NumberModel,
    Bool,
    t.reference(Token),
    t.union(...Object.values(SaberStyles)),
    t.union(...Object.values(Functions))
  ),
})

const InOutHelper = Layer.named("InOutHelper")
  .props({
    id: t.optional(t.identifier, () => uuidv4()),
    type: "Layer",
    title: t.optional(t.string, "InOutHelper"),
    description:
      "Creates a blast effect using the color BLAST when a blast is requested. The effect is basically two humps moving out from the blast location. The size of the humps can be changed with WAVE_SIZE, note that smaller values makes the humps bigger. WAVE_MS determines how fast the waves travel. Smaller values makes the waves travel slower. Finally FADEOUT_MS determines how fast the humps fade back to the base color.",
    token: t.optional(t.string, ":layer:"),
    template: "InOutHelperL<:properties:>",
    properties: t.optional(t.array(InOutHelperProperty), () => [
      InOutHelperProperty.create({
        title: "Extension amount",
        token: ":extensionAmount:",
        templateRequired: true,
        value: InOutFunc.create(),
      }),
      InOutHelperProperty.create({
        title: "Color when retracted",
        token: ":retractColor:",
        value: Color.create({ value: "Black" }),
      }),
      InOutHelperProperty.create({
        title: "Allow disable",
        token: ":allowDisable:",
        value: Bool.create(),
      }),
    ]),
  })
  .views((self) => ({
    get subLayers() {
      return self.properties.filter(
        (p) => p.value.type === "Style" || p.value.type === "Function"
      )
    },
  }))

export default InOutHelper
