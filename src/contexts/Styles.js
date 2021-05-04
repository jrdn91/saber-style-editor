import { getParent } from "mobx-state-tree"
import { persist } from "mst-persist"
import { createContext, useEffect, useState } from "react"
import Store from "store"
import Color from "store/models/ValueTypes/Color"

const StylesContext = createContext()
export default StylesContext

export const SaberStyles = {}
const saberStylesReq = require.context(
  "../store/models/SaberStyles",
  true,
  /^(.*\.(js))[^.]*$/im
)
saberStylesReq.keys().forEach((x) => {
  const saberStyleName = x.match(/\.\/([A-Za-z]+).js/)
  SaberStyles[saberStyleName[1]] = saberStylesReq(x).default
})

export const LayerTypes = {}
const layerTypesReq = require.context(
  "../store/models/LayerTypes",
  true,
  /^(.*\.(js))[^.]*$/im
)
layerTypesReq.keys().forEach((x) => {
  const saberStyleName = x.match(/\.\/([A-Za-z]+).js/)
  LayerTypes[saberStyleName[1]] = layerTypesReq(x).default
})

export const ValueTypes = {}
const valueTypesReq = require.context(
  "../store/models/ValueTypes",
  true,
  /^(.*\.(js))[^.]*$/im
)
valueTypesReq.keys().forEach((x) => {
  const valueTypeName = x.match(/\.\/([A-Za-z]+).js/)
  ValueTypes[valueTypeName[1]] = valueTypesReq(x).default
})

export const StylesContainer = ({ children }) => {
  const [store, setStore] = useState()
  const [expanded, setExpanded] = useState([-1])
  const [selectedProperty, setSelectedProperty] = useState() //currently selected property in the selectedStyle

  const toggleExpanded = (id) => {
    setExpanded((currentExpanded) => {
      if (expanded.includes(id)) {
        return currentExpanded.filter((c) => c !== id)
      } else {
        return [...currentExpanded, id]
      }
    })
  }

  // useDeepCompareEffect(() => {
  //   if (!isEmpty(styles)) {
  //     localStorage.setItem("styles", JSON.stringify(styles))
  //   }
  // }, [styles])

  useEffect(() => {
    const newStore = Store.create()
    setStore(newStore)
    // persist("Saber Style Editor", newStore, {})
    // const storedStyles = localStorage.getItem("styles")
    // if (storedStyles) {
    //   setStyles(JSON.parse(storedStyles))
    // }
  }, [])

  const addStyle = (style) => {
    const saberStyle = SaberStyles[style]
    try {
      const newStyle = saberStyle.create()
      selectedProperty.updateValue(newStyle)
    } catch (e) {
      console.error(e)
      throw new Error(`Could not add style of type ${style}`)
    }
  }

  const setColor = (color) => {
    try {
      const newColor = Color.create({ value: color.value })
      selectedProperty.updateValue(newColor)
    } catch (e) {
      console.error(e)
      throw new Error("Could not set color")
    }
  }

  return (
    <StylesContext.Provider
      value={{
        addStyle,
        setColor,
        store,
        expanded,
        setExpanded,
        selectedProperty,
        setSelectedProperty,
      }}
    >
      {children}
    </StylesContext.Provider>
  )
}
