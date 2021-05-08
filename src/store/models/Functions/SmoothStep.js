import { types as t } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

import { Layer, Property } from "../BaseModels"
import NumberModel from "../ValueTypes/NumberModel"

const SmoothStepProperty = t
  .compose(
    Property,
    t.model({
      value: t.union(NumberModel),
    })
  )
  .named("SmoothStepProperty")

const SmoothStep = Layer.named("SmoothStep")
  .props({
    id: t.optional(t.identifier, () => uuidv4()),
    type: "Function",
    title: t.optional(t.string, "SmoothStep function"),
    description:
      "A function to smoothly step between LED values positioned on the blade",
    token: t.optional(t.string, ":layer:"),
    template: "SmoothStep<Int<:position:>,Int<:stepWidth:>>",
    properties: t.optional(t.array(SmoothStepProperty), [
      SmoothStepProperty.create({
        title: "Position 0 = hilt, 32768 = tip",
        token: ":position:",
        value: NumberModel.create({ value: 16384 }),
      }),
      SmoothStepProperty.create({
        title: "Step width 32768 = length of blade",
        token: ":stepWidth:",
        value: NumberModel.create({ value: 24000 }),
      }),
    ]),
  })
  .views((self) => ({
    get subLayers() {
      // will never have sub styles
      return false
    },
  }))

export default SmoothStep
