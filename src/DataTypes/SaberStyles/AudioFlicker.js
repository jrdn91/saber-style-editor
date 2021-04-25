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
    // value: types.optional(types.union(Color, Rgb), {}),
    // properties: types.optional(
    //   types.array(
    //     types.model({
    //       id: types.optional(types.identifier, uuidv4()),
    //       title: types.optional(types.string, "Property"),
    //       token: types.optional(types.string, ":property:"),
    //       value: types.optional(types.union(Color, Rgb), {}),
    //     })
    //   ),
    //   [
    //     {
    //       title: "Color A",
    //       token: ":colorA:",
    //       value: Color.create(),
    //     },
    //     {
    //       title: "Color B",
    //       token: ":colorB:",
    //       value: Color.create({ value: "Blue" }),
    //     },
    //   ]
    // ),
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

// const AudioFlicker = {
//   title: "AudioFlicker",
//   description:
//     "Mixes between A and B based on audio. Quiet audio means more A, loud audio means more B. Based on a single sample instead of an average to make it flicker.",
//   properties: [
//     {
//       title: "Color A",
//       allowedValueTypes: ["Color", "Rgb"],
//       token: ":colorA:",
//       value: {
//         title: "Color",
//         canEdit: true,
//         description: "A simple color value",
//         value: "White",
//         displayValue: "White",
//         token: ":color:",
//         template: ":color:",
//       },
//     },
//     {
//       title: "Color B",
//       allowedValueTypes: ["Color", "Rgb"],
//       token: ":colorB:",
//       value: {
//         title: "Color",
//         canEdit: true,
//         description: "A simple color value",
//         value: "Blue",
//         displayValue: "Blue",
//         token: ":color:",
//         template: ":color:",
//       },
//     },
//   ],
//   template: "AudioFlicker<:colorA:,:colorB:>",
// }

export default AudioFlicker
