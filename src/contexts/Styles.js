import { Property } from "DataTypes/SaberStyles/BaseType"
import BaseValue from "DataTypes/ValueTypes/BaseValue"
import Color from "DataTypes/ValueTypes/Color"
import { isEmpty } from "lodash"
import { createContext, useEffect, useState } from "react"
import useDeepCompareEffect from "use-deep-compare-effect"
import { v4 as uuidv4 } from "uuid"

const StylesContext = createContext()
export default StylesContext

export const SaberStyles = {}
const saberStylesReq = require.context(
  "../DataTypes/SaberStyles",
  true,
  /^(.*\.(js))[^.]*$/im
)
saberStylesReq.keys().forEach((x) => {
  const saberStyleName = x.match(/\.\/([A-Za-z]+).js/)
  SaberStyles[saberStyleName[1]] = saberStylesReq(x).default
})

export const ValueTypes = {}
const valueTypesReq = require.context(
  "../DataTypes/ValueTypes",
  true,
  /^(.*\.(js))[^.]*$/im
)
valueTypesReq.keys().forEach((x) => {
  const valueTypeName = x.match(/\.\/([A-Za-z]+).js/)
  ValueTypes[valueTypeName[1]] = valueTypesReq(x).default
})

export const StylesContainer = ({ children }) => {
  const [styles, setStyles] = useState([])
  const [expanded, setExpanded] = useState([])
  const [selectedStyle, setSelectedStyle] = useState() // currently selected style
  const [selectedProperty, setSelectedProperty] = useState() //currently selected property in the selectedStyle

  // useDeepCompareEffect(() => {
  //   if (!isEmpty(styles)) {
  //     localStorage.setItem("styles", JSON.stringify(styles))
  //   }
  // }, [styles])

  // useEffect(() => {
  //   const storedStyles = localStorage.getItem("styles")
  //   if (storedStyles) {
  //     setStyles(JSON.parse(storedStyles))
  //   }
  // }, [])

  const addStyle = (style) => {
    const saberStyle = SaberStyles[style]
    try {
      const newStyle = saberStyle.create({
        id: uuidv4(),
        title: "AudioFlicker",
        description:
          "Mixes between A and B based on audio. Quiet audio means more A, loud audio means more B. Based on a single sample instead of an average to make it flicker.",
        properties: [
          Property.create({
            id: uuidv4(),
            title: "Color A",
            allowedValueTypes: ["Color", "Rgb"],
            token: ":colorA:",
            value: Color.create({
              id: uuidv4(),
              title: "Color",
              description: "A simple color value",
              value: "White",
              token: ":color:",
              template: ":color:",
              canEdit: true,
            }),
          }),
          Property.create({
            id: uuidv4(),
            title: "Color A",
            allowedValueTypes: ["Color", "Rgb"],
            token: ":colorB:",
            value: Color.create({
              id: uuidv4(),
              title: "Color",
              description: "A simple color value",
              value: "Blue",
              token: ":color:",
              template: ":color:",
              canEdit: true,
            }),
          }),
        ],
        template: "AudioFlicker<:colorA:,:colorB:>",
      })
      setStyles((prevStyles) => [...prevStyles, newStyle])
    } catch (e) {
      console.error(e)
      throw new Error(`Could not add style of type ${style}`)
    }
  }

  const updateStyleProperty = (styleId, propertyToken, value) => {
    setStyles((prevStyles) => {
      return prevStyles.map((style) => {
        if (style.id === styleId) {
          return {
            ...style,
            properties: style.properties.map((prop) => {
              if (prop.token === propertyToken) {
                return {
                  ...prop,
                  value,
                }
              }
              return prop
            }),
          }
        }
        return style
      })
    })
  }

  return (
    <StylesContext.Provider
      value={{
        addStyle,
        styles,
        updateStyleProperty,
        expanded,
        setExpanded,
        selectedStyle,
        setSelectedStyle,
        selectedProperty,
        setSelectedProperty,
      }}
    >
      {children}
    </StylesContext.Provider>
  )
}
