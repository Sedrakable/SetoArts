// svgo.config.mjs
export default {
  multipass: true,
  plugins: [
    {
      name: "removeDimensions",
      active: true,
    },
    {
      name: "removeViewBox",
      active: false, // Keep viewBox for responsive SVGs
    },
    {
      name: "removeXMLProcInst", // Removes: <?xml version="1.0" encoding="UTF-8"?>
      active: true,
    },
    {
      name: "removeAttrs", // Removes unwanted attributes
      params: {
        attrs: ["id", "data-name", "xmlns"],
      },
    },
  ],
};
