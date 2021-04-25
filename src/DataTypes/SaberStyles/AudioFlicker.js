import Token from "DataTypes/Token"
import Color from "DataTypes/ValueTypes/Color"
import Rgb from "DataTypes/ValueTypes/Rgb"
import { types } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

const AudioFlickerProperty = types
  .model("AudioFlickerProperty", {
    id: types.optional(types.identifier, uuidv4()),
    title: types.optional(types.string, "Property"),
    allowedValueTypes: types.optional(types.array(types.string), [""]),
    token: types.optional(types.string, ":property:"),
    value: types.union(Color, Rgb, types.reference(Token)),
  })
  .actions((self) => ({
    updateValue(newValue) {
      self.value = newValue
    },
  }))

const AudioFlicker = types
  .model("AudioFlicker", {
    id: types.optional(types.identifier, uuidv4()),
    title: types.optional(types.string, "AudioFlicker"),
    description: types.optional(types.string, "A base Saber Style"),
    template: types.optional(types.string, "SaberStyle<>"),
    allowedValueTypes: types.optional(types.array(types.string), [
      "Color",
      "Rgb",
    ]),
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
  .actions((self) => ({
    setValue(id, newValue) {
      self.properties = self.properties.map((p) => {
        if (p.id === id) {
          p.value = newValue
        }
        return p
      })
    },
  }))

export default AudioFlicker
