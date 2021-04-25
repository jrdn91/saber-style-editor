import Token from "DataTypes/Token"
import Color from "DataTypes/ValueTypes/Color"
import NumberType from "DataTypes/ValueTypes/Number"
import Rgb from "DataTypes/ValueTypes/Rgb"
import { types } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

const BrownNoiseFlickerProperty = types
  .model("BrownNoiseFlickerProperty", {
    id: types.optional(types.identifier, uuidv4()),
    title: types.optional(types.string, "Property"),
    token: types.optional(types.string, ":property:"),
    value: types.union(Color, Rgb, NumberType, types.reference(Token)),
  })
  .actions((self) => ({
    updateValue(newValue) {
      self.value = newValue
    },
    getCode() {
      return self.value.getCode()
    },
  }))

const BrownNoiseFlicker = types
  .model("BrownNoiseFlicker", {
    id: types.optional(types.identifier, uuidv4()),
    title: types.optional(types.string, "BrownNoiseFlicker"),
    description: types.optional(
      types.string,
      "Randomly selects between A and B, but keeps nearby pixels looking similar."
    ),
    template: types.optional(
      types.string,
      "BrownNoiseFlicker<:colorA:,:colorB:,:grade:>"
    ),
    properties: types.optional(types.array(BrownNoiseFlickerProperty), [
      BrownNoiseFlickerProperty.create({
        title: "Color A",
        token: ":colorA:",
        value: Color.create({ value: "Green" }),
      }),
      BrownNoiseFlickerProperty.create({
        title: "Color B",
        token: ":colorB:",
        value: Color.create({ value: "Magenta" }),
      }),
      BrownNoiseFlickerProperty.create({
        title: "Grade",
        token: ":grade:",
        value: NumberType.create({ value: 50 }),
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
    getCode() {
      let templateString = self.template
      self.properties.forEach((property) => {
        templateString = templateString.replace(
          property.token,
          property.getCode()
        )
      })
      return templateString
    },
  }))

export default BrownNoiseFlicker
