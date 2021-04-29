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

const Store = t
  .model({
    layers: t.optional(t.array(t.union(...Object.values(LayerTypes))), [
      BaseLayer.create({ value: Color.create({ value: "Blue" }) }),
    ]),
    tokens: t.array(Token),
    selectedLayer: t.maybeNull(
      t.reference(t.union(...Object.values(LayerTypes)))
    ),
  })
  .actions((self) => ({
    setSelectedLayer(layer) {
      self.selectedLayer = layer
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
