import { types as t } from "mobx-state-tree"
import Token from "store/models/Token"
import Color from "store/models/ValueTypes/Color"
import Rgb from "store/models/ValueTypes/Rgb"
import { v4 as uuidv4 } from "uuid"

import { Property, Style } from "../BaseModels"

const AudioFlickerProperty = Property.named("AudioFlickerProperty").props({
  value: t.union(Color, Rgb, t.reference(Token)),
})

const AudioFlicker = Style.named("AudioFlicker").props({
  id: t.optional(t.identifier, () => uuidv4()),
  type: "Style",
  title: t.optional(t.string, "AudioFlicker"),
  description: t.optional(
    t.string,
    "Mixes between A and B based on audio. Quiet audio means more A, loud audio means more B. Based on a single sample instead of an average to make it flicker."
  ),
  template: t.optional(t.string, "AudioFlicker<:colorA:,:colorB:>"),
  displayValue: "AudioFlicker",
  properties: t.optional(t.array(AudioFlickerProperty), [
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
