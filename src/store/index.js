import Token from "DataTypes/Token"
import { types as t } from "mobx-state-tree"

export const SaberStyles = {}
const saberStylesReq = require.context(
  "../DataTypes/SaberStyles",
  true,
  /^(.*\.(js))[^.]*$/im
)
saberStylesReq.keys().forEach((x) => {
  const saberStyleName = x.match(/\.\/([A-Za-z]+).js/)
  SaberStyles[saberStyleName[1]] = saberStylesReq(x).default
})

const Store = t
  .model({
    layers: t.array(t.union(...Object.values(SaberStyles))),
    tokens: t.array(Token),
  })
  .actions((self) => ({
    addLayer(layer) {
      self.layers.push(layer)
    },
    removeLayer(layerId) {
      self.layers = self.layers.filter((l) => l.id !== layerId)
    },
    addToken(token) {
      self.tokens.push(token)
    },
    removeToken(tokenId) {
      self.tokens = self.tokens.filter((l) => l.id !== tokenId)
    },
  }))

export default Store
