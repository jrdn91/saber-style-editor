import Token from "DataTypes/Token"
import Color from "DataTypes/ValueTypes/Color"
import Rgb from "DataTypes/ValueTypes/Rgb"
import { types as t } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

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

const BaseLayer = t.model("BaseLayer", {
  id: t.optional(t.identifier, uuidv4()),
  title: t.optional(t.string, "BaseLayer"),
  description:
    "This is the Base Layer for your Saber and usually holds the color for your Saber",
  token: t.optional(t.string, ":layer:"),
  value: t.union(
    Color,
    Rgb,
    t.reference(Token),
    t.union(...Object.values(SaberStyles))
  ),
})

export default BaseLayer
