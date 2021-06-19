export const SaberStyles = {}
const saberStylesReq = require.context(
  "./SaberStyles",
  true,
  /^(.*\.(js))[^.]*$/im
)
saberStylesReq.keys().forEach((x) => {
  const saberStyleName = x.match(/\.\/([A-Za-z]+).js/)
  SaberStyles[saberStyleName[1]] = saberStylesReq(x).default
})

export const ValueTypes = {}
const valueTypesReq = require.context(
  "./ValueTypes",
  true,
  /^(.*\.(js))[^.]*$/im
)
valueTypesReq.keys().forEach((x) => {
  const saberStyleName = x.match(/\.\/([A-Za-z]+).js/)
  ValueTypes[saberStyleName[1]] = valueTypesReq(x).default
})

export const Functions = {}
const functionsReq = require.context("./Functions", true, /^(.*\.(js))[^.]*$/im)
functionsReq.keys().forEach((x) => {
  const funcName = x.match(/\.\/([A-Za-z]+).js/)
  Functions[funcName[1]] = functionsReq(x).default
})

export const Effects = {}
const effectsReq = require.context("./Effects", true, /^(.*\.(js))[^.]*$/im)
effectsReq.keys().forEach((x) => {
  const effectName = x.match(/\.\/([A-Za-z]+).js/)
  Effects[effectName[1]] = effectsReq(x).default
})
