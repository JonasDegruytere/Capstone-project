const COLORS = {
    primary: "#000000",
    secondary: "#FFFFFF",
    tertiary: "#FF7754",

    gray: "#D3D3D3",
    gray2: "#C1C0C8",

    white: "#F3F4F8",
    lightWhite: "#FAFAFC",

    lightBackground: "#FFFFFF",
    darkBackground: "#121212",
    lightText: "#FFFFFF",
    darkText: "#000000",

    lightWhiteBackground: "#FAFAFC",
    lightDarkBackground: "#222222"

  };

  const FONT = {
    regular: "DMRegular",
    medium: "DMMedium",
    bold: "DMBold",
  };

  const SIZES = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32,
  };

  const SHADOWS = {
    small: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
      elevation: 5,
    },
  };

  export { COLORS, FONT, SIZES, SHADOWS };