import { types as t } from "mobx-state-tree"
import Token from "store/models/Token"
import Color from "store/models/ValueTypes/Color"
import NumberType from "store/models/ValueTypes/Number"
import Rgb from "store/models/ValueTypes/Rgb"
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

const BlastProperty = t
  .model("BlastProperty", {
    id: t.optional(t.identifier, () => uuidv4()),
    title: t.optional(t.string, "Property"),
    token: t.optional(t.string, ":property:"),
    value: t.union(
      Color,
      Rgb,
      NumberType,
      t.reference(Token),
      t.union(...Object.values(SaberStyles))
    ),
  })
  .actions((self) => ({
    updateValue(newValue) {
      self.value = newValue
    },
    getCode() {
      return self.value.getCode()
    },
  }))

const Blast = t.model("Blast", {
  id: t.optional(t.identifier, () => uuidv4()),
  title: t.optional(t.string, "Blast"),
  description:
    "Creates a blast effect using the color BLAST when a blast is requested. The effect is basically two humps moving out from the blast location. The size of the humps can be changed with WAVE_SIZE, note that smaller values makes the humps bigger. WAVE_MS determines how fast the waves travel. Smaller values makes the waves travel slower. Finally FADEOUT_MS determines how fast the humps fade back to the base color.",
  token: t.optional(t.string, ":layer:"),
  template: "BlastL<:colorA:,:fadeOutTime:,:waveSize:,:waveSpeed:>",
  properties: t.optional(t.array(BlastProperty), [
    BlastProperty.create({
      title: "Color A",
      token: ":colorA:",
      value: Color.create({ value: "White" }),
    }),
    BlastProperty.create({
      title: "Fade out time",
      token: ":fadeOutTime:",
      value: NumberType.create({ value: 200 }),
    }),
    BlastProperty.create({
      title: "Wave Size",
      token: ":waveSize:",
      value: NumberType.create({ value: 100 }),
    }),
    BlastProperty.create({
      title: "Wave Speed",
      token: ":colorA:",
      value: NumberType.create({ value: 400 }),
    }),
  ]),
})

export default Blast
