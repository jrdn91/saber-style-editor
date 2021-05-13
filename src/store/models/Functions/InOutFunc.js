import { types as t } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

import { Layer, Property } from "../BaseModels"
import NumberModel from "../ValueTypes/NumberModel"

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
    template: "InOutFuncX<:properties:>",
    properties: t.optional(t.array(InOutFuncProperty), () => [
      InOutFuncProperty.create({
        title: "Out milliseconds",
        token: ":outMillis:",
        templateRequired: true,
        value: NumberModel.create({ value: 300 }),
      }),
      InOutFuncProperty.create({
        title: "In milliseconds",
        token: ":inMillis:",
        templateRequired: true,
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
