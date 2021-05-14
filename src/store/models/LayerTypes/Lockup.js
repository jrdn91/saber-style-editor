import { types as t } from "mobx-state-tree"
import Token from "store/models/Token"
import Color from "store/models/ValueTypes/Color"
import NumberModel from "store/models/ValueTypes/NumberModel"
import Rgb from "store/models/ValueTypes/Rgb"
import { v4 as uuidv4 } from "uuid"

import { Layer, Property } from "../BaseModels"
import Bump from "../Functions/Bump"
import LayerFunctions, {
  LayerFunctionsProperty,
} from "../Functions/LayerFunctions"
import SmoothStep from "../Functions/SmoothStep"
import AudioFlicker from "../SaberStyles/AudioFlicker"

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
const functionStylesReq = require.context(
  "../Functions",
  true,
  /^(.*\.(js))[^.]*$/im
)
functionStylesReq.keys().forEach((x) => {
  const functionStyleName = x.match(/\.\/([A-Za-z]+).js/)
  Functions[functionStyleName[1]] = functionStylesReq(x).default
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

const LockupProperty = Property.named("LockupProperty").props({
  value: t.union(
    Color,
    Rgb,
    NumberModel,
    t.reference(Token),
    t.union(...Object.values(SaberStyles)),
    t.union(...Object.values(Functions))
  ),
})

const dragShapeSmoothStep = SmoothStep.create()
console.log(dragShapeSmoothStep.toJSON())
dragShapeSmoothStep.properties[0].value.update(28671)
dragShapeSmoothStep.properties[1].value.update(4096)

const Lockup = Layer.named("Lockup")
  .props({
    id: t.optional(t.identifier, () => uuidv4()),
    type: "Layer",
    title: t.optional(t.string, "Lockup"),
    description:
      "Shows LOCKUP if the lockup state is true, otherwise BASE. Also handles Drag, Melt and Lightning Block lockup types unless those are handled elsewhere in the same style.",
    token: t.optional(t.string, ":layer:"),
    template: "LockupL<:properties:>", // LockupL<LOCKUP, DRAG_COLOR, LOCKUP_SHAPE, DRAG_SHAPE, LB_SHAPE>
    properties: t.optional(t.array(LockupProperty), () => [
      LockupProperty.create({
        title: "Lockup color",
        token: ":lockupColor:",
        templateRequired: true,
        value: AudioFlicker.create(),
      }),
      LockupProperty.create({
        title: "Drag color",
        token: ":dragColor:",
        value: AudioFlicker.create(),
      }),
      LockupProperty.create({
        title: "Lockup shape",
        token: ":lockupShape:",
        value: NumberModel.create({ value: 32768 }),
      }),
      LockupProperty.create({
        title: "Drag shape",
        token: ":dragShape:",
        value: dragShapeSmoothStep,
      }),
      LockupProperty.create({
        title: "Lightning block shape",
        token: ":lbShape:",
        value: LayerFunctions.create({
          properties: [
            LayerFunctionsProperty.create({ value: Bump.create() }),
            LayerFunctionsProperty.create({ value: Bump.create() }),
          ],
        }),
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

export default Lockup
