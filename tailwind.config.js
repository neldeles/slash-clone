function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      indigo: {
        100: "#7730fe",
        200: "#6103ea",
      },
      alabaster: "#fbfbfb",
      black: "#000000",
      gray: {
        100: "#f7f7f7",
        200: "#efefef",
        250: "#dfdfe2",
        300: "#cfcfcf",
        400: "#636363",
        500: "#5e6270",
        600: "#1c1c1c",
      },
      green: "#01a09e",
    },
  },
  plugins: [],
  darkMode: "class",
};
