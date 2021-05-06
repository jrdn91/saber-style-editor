import { types as t } from "mobx-state-tree"
import Token from "store/models/Token"
import Color from "store/models/ValueTypes/Color"
import Rgb from "store/models/ValueTypes/Rgb"
import { v4 as uuidv4 } from "uuid"

import { Layer, Property } from "../BaseModels"
import NumberModel from "../ValueTypes/NumberModel"

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

const InOutFuncProperty = t
  .compose(
    Property,
    t.model({
      value: t.union(NumberModel),
    })
  )
  .named("InOutFuncProperty")

const InOutFunc = Layer.named("InOutFunc")
  .props({
    id: t.optional(t.identifier, () => uuidv4()),
    type: "Function",
    title: t.optional(t.string, "InOut function"),
    description:
      "A simple in our function to specify time miliseconds for effects",
    token: t.optional(t.string, ":layer:"),
    template: "InOutFuncX<Int<:outMillis:>,Int<:inMillis:>>",
    properties: t.optional(t.array(InOutFuncProperty), [
      InOutFuncProperty.create({
        title: "Out milliseconds",
        token: ":outMillis:",
        value: NumberModel.create({ value: 300 }),
      }),
      InOutFuncProperty.create({
        title: "In milliseconds",
        token: ":inMillis:",
        value: NumberModel.create({ value: 800 }),
      }),
    ]),
  })
  .views((self) => ({
    get subLayers() {
      return self.properties.filter((p) => p.value.type === "Style")
    },
  }))

export default InOutFunc
