const COLORS = {
  light: {
    bgLight: "#FAFAFC",
    bg: "#F3F4F8",
    bgStrong: "#FAFAFC",

    fgLight: "#F2F2F2",
    fg: "#242323",
    fgStrong: "#39393e",
  },
  dark: {
    fgLight: "#FAFAFC",
    fg: "#F3F4F8",
    fgStrong: "#FAFAFC",

    bgLight: "#F2F2F2",
    bg: "#242323",
    bgStrong: "#39393e",
  },
  primary: "#036b61",
  secondary: "#bfbed7",
  tertiary: "#FF7754",

  gray: "#83829A",
  gray2: "#C1C0C8",

  white: "#F3F4F8",
  lightWhite: "#FAFAFC",
  backGround: "#F3F4F8",
  textColor: "#F3F4F8",

  dark: "#242323",
  secondaryDark: "#39393e",
  light: "#F2F2F2",
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
