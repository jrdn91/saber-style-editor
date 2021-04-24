import { isEmpty } from "lodash"
import { createContext, useEffect, useState } from "react"
import useDeepCompareEffect from "use-deep-compare-effect"
import { v4 as uuidv4 } from "uuid"

const StylesContext = createContext()
export default StylesContext

const SaberStyles = {}
const componentsReq = require.context(
  "../SaberStyles",
  true,
  /^(.*\.(js))[^.]*$/im
)
componentsReq.keys().forEach((x) => {
  const saberStyleName = x.match(/\.\/([A-Za-z]+).js/)
  SaberStyles[saberStyleName[1]] = componentsReq(x).default
})

export const StylesContainer = ({ children }) => {
  const [styles, setStyles] = useState([])
  const [expanded, setExpanded] = useState([])
  const [selected, setSelected] = useState()

  useDeepCompareEffect(() => {
    if (!isEmpty(styles)) {
      localStorage.setItem("styles", JSON.stringify(styles))
    }
  }, [styles])

  useEffect(() => {
    const storedStyles = localStorage.getItem("styles")
    if (storedStyles) {
      setStyles(JSON.parse(storedStyles))
    }
  }, [])

  const addStyle = (style) => {
    const saberStyle = SaberStyles[style]
    if (saberStyle) {
      setStyles((prevStyles) => [
        ...prevStyles,
        { ...saberStyle, id: uuidv4() },
      ])
    } else {
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
        selected,
        setSelected,
      }}
    >
      {children}
    </StylesContext.Provider>
  )
}
