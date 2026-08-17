module.exports = {
  // react-native-svg only inherits color onto children that have no color of
  // their own. Icons whose inner paths each carry `currentColor` would ignore
  // the `color` prop, so bind those values to the prop explicitly.
  replaceAttrValues: {
    currentColor: "{props.color ?? 'currentColor'}",
  },
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            // SVGO drops viewBox when it matches width/height. On the web that
            // is harmless, but react-native-svg needs viewBox to scale: without
            // it the icon crops to the width/height props instead of fitting.
            removeViewBox: false,
          },
        },
      },
    ],
  },
};
