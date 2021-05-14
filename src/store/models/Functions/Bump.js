import { types as t } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

import { Layer, Property } from "../BaseModels"

const BumpProperty = t
  .compose(
    Property,
    t.model({
      value: "",
    })
  )
  .named("BumpProperty")

const Bump = Layer.named("Bump")
  .props({
    id: t.optional(t.identifier, () => uuidv4()),
    type: "Function",
    title: t.optional(t.string, "Bump"),
    description:
      "Returns different values for each LED, forming a bump shape.\nIf BUMP_POSITION is 0, bump will be at the hilt.\nIf BUMP_POSITION is 32768, the bump will be at the tip.\nIf BUMP_WIDTH_FRACTION is 1, bump will be extremely narrow.\nIf BUMP_WIDTH_FRACTION is 32768, it will fill up most/all of the blade.",
    token: t.optional(t.string, ":layer:"),
    template: "Bump<:properties:>", //Bump<BUMP_POSITION, BUMP_WIDTH_FRACTION>
    properties: t.optional(t.array(BumpProperty), []),
  })
  .views((self) => ({
    get subLayers() {
      // will never have sub styles
      return false
    },
  }))

export default Bump
