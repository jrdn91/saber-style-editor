import Color from "DataTypes/ValueTypes/Color"
import Rgb from "DataTypes/ValueTypes/Rgb"
import { types } from "mobx-state-tree"

export const Property = types.model("Property", {
  title: types.string,
  allowedValueTypes: types.array(types.string),
  token: types.string,
  value: types.union(Color, Rgb),
})

const BaseType = types.model("BaseType", {
  id: types.identifier,
  title: types.string,
  description: types.string,
  template: types.string,
  properties: types.array(Property),
})

export default BaseType
