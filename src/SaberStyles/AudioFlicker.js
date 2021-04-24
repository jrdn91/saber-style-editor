const styleObject = {
  title: "AudioFlicker",
  description:
    "Mixes between A and B based on audio. Quiet audio means more A, loud audio means more B. Based on a single sample instead of an average to make it flicker.",
  properties: [
    {
      title: "Color A",
      allowedValues: ["color"],
      token: ":colorA:",
      value: "White",
    },
    {
      title: "Color B",
      allowedValues: ["color"],
      token: ":colorB:",
      value: "Blue",
    },
  ],
  template: "AudioFlicker<:colorA:,:colorB:>",
}

export default styleObject
