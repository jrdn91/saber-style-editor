const styleObject = {
  title: "AudioFlicker",
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
      id: ":colorB:",
      value: "Blue",
    },
  ],
  template: "AudioFlicker<:colorA:,:colorB:>",
}

export default styleObject
