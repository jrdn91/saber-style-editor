const styleObject = {
  title: "AudioFlicker",
  description:
    "Mixes between A and B based on audio. Quiet audio means more A, loud audio means more B. Based on a single sample instead of an average to make it flicker.",
  properties: [
    {
      title: "Color A",
      allowedValueTypes: ["Color", "Rgb"],
      token: ":colorA:",
      value: {
        title: "Color",
        description: "A simple color value",
        value: "White",
        displayValue: "White",
        token: ":color:",
        template: ":color:",
      },
    },
    {
      title: "Color B",
      allowedValueTypes: ["Color", "Rgb"],
      token: ":colorB:",
      value: {
        title: "Color",
        description: "A simple color value",
        value: "Blue",
        displayValue: "Blue",
        token: ":color:",
        template: ":color:",
      },
    },
  ],
  template: "AudioFlicker<:colorA:,:colorB:>",
}

export default styleObject
