import { types } from "mobx-state-tree"

const BaseValue = types
  .model("BaseValue", {
    id: types.identifier,
    title: types.string,
    description: types.string,
    value: types.string,
    token: types.string,
    template: types.string,
    canEdit: types.boolean,
  })
  .views((self) => ({
    get displayValue() {
      return self.value
    },
  }))
  .actions((self) => ({
    update(newValue) {
      self.value = newValue
    },
  }))

export default BaseValue
