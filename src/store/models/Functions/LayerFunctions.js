import { types as t } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

import { Layer, Property } from "../BaseModels"

const Functions = {}
const functionsReq = require.context("./", true, /^(.*\.(js))[^.]*$/im)
functionsReq.keys().forEach((x) => {
  const functionName = x.match(/\.\/([A-Za-z]+).js/)
  if (functionName[1] !== "LayerFunctions") {
    Functions[functionName[1]] = functionsReq(x).default
  }
})

export const LayerFunctionsProperty = t
  .compose(
    Property,
    t.model({
      value: t.union(...Object.values(Functions)),
    })
  )
  .named("LayerFunctionsProperty")

const LayerFunctions = Layer.named("LayerFunctions function")
  .props({
    id: t.optional(t.identifier, () => uuidv4()),
    type: "Function",
    title: t.optional(t.string, "LayerFunctions"),
    description: "Combines layer functions",
    token: t.optional(t.string, ":layer:"),
    template: "LayerFunctions<:properties:>",
    properties: t.optional(t.array(LayerFunctionsProperty), () => []),
  })
  .views((self) => ({
    get subLayers() {
      // will never have sub styles
      return false
    },
  }))

export default LayerFunctions
