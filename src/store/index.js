import { types as t } from "mobx-state-tree"
import BaseLayer from "store/models/LayerTypes/BaseLayer"
import Token from "store/models/Token"
import Color from "store/models/ValueTypes/Color"

export const SaberStyles = {}
const saberStylesReq = require.context(
  "../store/models/SaberStyles",
  true,
  /^(.*\.(js))[^.]*$/im
)
saberStylesReq.keys().forEach((x) => {
  const saberStyleName = x.match(/\.\/([A-Za-z]+).js/)
  SaberStyles[saberStyleName[1]] = saberStylesReq(x).default
})

export const LayerTypes = {}
const layerTypesReq = require.context(
  "../store/models/LayerTypes",
  true,
  /^(.*\.(js))[^.]*$/im
)
layerTypesReq.keys().forEach((x) => {
  const saberStyleName = x.match(/\.\/([A-Za-z]+).js/)
  LayerTypes[saberStyleName[1]] = layerTypesReq(x).default
})

export const Functions = {}
const functionsReq = require.context(
  "../store/models/Functions",
  true,
  /^(.*\.(js))[^.]*$/im
)
functionsReq.keys().forEach((x) => {
  const functionName = x.match(/\.\/([A-Za-z]+).js/)
  Functions[functionName[1]] = functionsReq(x).default
})

const Store = t
  .model({
    layers: t.optional(t.array(t.union(...Object.values(LayerTypes))), [
      BaseLayer.create({ value: Color.create({ value: "Blue" }) }),
    ]),
    tokens: t.array(Token),
    selectedLayer: t.maybeNull(
      t.reference(
        t.union(
          ...Object.values(LayerTypes),
          ...Object.values(SaberStyles),
          ...Object.values(Functions)
        )
      )
    ),
  })
  .actions((self) => ({
    setSelectedLayer(model) {
      if (model.type === "Layer") {
        // passed in model is a layer so it's safe to set
        self.selectedLayer = model
      } else if (model.type === "Property") {
        // passed in model is a property of a layer, so we need to set it to the value of the model
        self.selectedLayer = model.value
      } else {
        console.error(
          `model type ${model.type} is not a supported type to select`
        )
      }
    },
    addLayer(layer) {
      self.layers.push(layer)
    },
    removeLayer(layerId) {
      if (self?.selectedLayer?.id === layerId) {
        self.setSelectedLayer(null)
      }
      self.layers = self.layers.filter((l) => l.id !== layerId)
    },
    addToken(token) {
      self.tokens.push(token)
    },
    removeToken(tokenId) {
      self.tokens = self.tokens.filter((l) => l.id !== tokenId)
    },
    getCode() {
      const layerCodes = self.layers.map((layer) => layer.getCode())
      return `StylePtr<Layers<${layerCodes.join(",")}>>()`
    },
  }))

export default Store
