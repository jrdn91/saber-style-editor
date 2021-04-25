import { useMemo } from "react"

const useColorValue = (color) => {
  return useMemo(() => {
    if (color === undefined) return ""
    if (typeof color === "string") return color
    return `rgb<${color.r},${color.g},${color.b}>`
  }, [color])
}

export default useColorValue
