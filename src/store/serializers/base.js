import { forOwn } from "lodash"

import { attr } from "../modelizer"

export const Base = class {
  constructor(...props) {
    const [model, data] = props
    forOwn(data, (value, key) => {
      if (model.hasOwnProperty(key)) {
        this[key] = attr(key, model[key], value, this)
      } else {
        this[key] = value
      }
    })
  }
}

export default Base
