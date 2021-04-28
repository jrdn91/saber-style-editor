import { types } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

const Token = types
  .model("Token", {
    id: types.optional(types.identifier, () => uuidv4()),
    title: types.string,
    value: types.string,
  })
  .views((self) => ({
    get displayValue() {
      return self.value
    },
  }))
  .actions((self) => ({
    update(values) {
      Object.keys(values).forEach((key) => {
        self[key] = values[key]
      })
    },
  }))

export default Token
