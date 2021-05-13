import { types as t } from "mobx-state-tree"
import Token from "store/models/Token"
import Color from "store/models/ValueTypes/Color"
import Rgb from "store/models/ValueTypes/Rgb"
import { v4 as uuidv4 } from "uuid"

import { Layer, Property } from "../BaseModels"

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

const BaseLayerProperty = t
  .compose(
    Property,
    t.model({
      value: t.union(
        Color,
        Rgb,
        t.reference(Token),
        t.union(...Object.values(SaberStyles))
      ),
    })
  )
  .named("BaseLayerProperty")

const BaseLayer = Layer.named("BaseLayer")
  .props({
    id: t.optional(t.identifier, () => uuidv4()),
    type: "Layer",
    title: t.optional(t.string, "Base Layer"),
    description:
      "This is the Base Layer for your Saber and usually holds the color for your Saber",
    token: t.optional(t.string, ":layer:"),
    template: ":properties:",
    properties: t.optional(t.array(BaseLayerProperty), () => [
      BaseLayerProperty.create({
        title: "Base Color",
        token: ":colorA:",
        templateRequired: true,
        value: Color.create({ value: "Blue" }),
      }),
    ]),
  })
  .views((self) => ({
    get subLayers() {
      return self.properties.filter((p) => p.value.type === "Style")
    },
  }))

export default BaseLayer
