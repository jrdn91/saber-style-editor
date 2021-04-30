import { types } from "mobx-state-tree"
import Token from "store/models/Token"
import Color from "store/models/ValueTypes/Color"
import Rgb from "store/models/ValueTypes/Rgb"
import { v4 as uuidv4 } from "uuid"

import { Style } from "../BaseModels"

const AudioFlickerProperty = types
  .model("AudioFlickerProperty", {
    id: types.optional(types.identifier, () => uuidv4()),
    type: "Property",
    title: types.optional(types.string, "Property"),
    token: types.optional(types.string, ":property:"),
    value: types.union(Color, Rgb, types.reference(Token)),
  })
  .actions((self) => ({
    updateValue(newValue) {
      self.value = newValue
    },
    getCode() {
      return self.value.getCode()
    },
  }))

const AudioFlicker = Style.named("AudioFlicker").props({
  id: types.optional(types.identifier, () => uuidv4()),
  type: "Style",
  title: types.optional(types.string, "AudioFlicker"),
  description: types.optional(
    types.string,
    "Mixes between A and B based on audio. Quiet audio means more A, loud audio means more B. Based on a single sample instead of an average to make it flicker."
  ),
  template: types.optional(types.string, "AudioFlicker<:colorA:,:colorB:>"),
  displayValue: "AudioFlicker",
  properties: types.optional(types.array(AudioFlickerProperty), [
    AudioFlickerProperty.create({
      title: "Color A",
      token: ":colorA:",
      value: Color.create(),
    }),
    AudioFlickerProperty.create({
      title: "Color B",
      token: ":colorB:",
      value: Color.create({ value: "Blue" }),
    }),
  ]),
})

export default AudioFlicker
