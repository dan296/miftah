const thCol = {
  lL: "#FAFAFC",
  l: "#F3F4F8",
  lS: "#FAFAFC",

  dL: "#1d1d24",
  d: "#0a0e12",
  dS: "#000",
}

interface ColorPalette {
  [key: string]: {
    fgLight: string,
    fg: string,
    fgStrong: string,
    bgLight: string,
    bg: string,
    bgStrong: string,
  }
}

const COLORS = {
  primary: "#009687",
  primaryDark: "#036b61",
  secondary: "#bfbed7",
  tertiary: "#FF7754",
  gray: "#8b8b8b",
  red: "#f05252",
  button: "#0b0b11"
};

const THEMES:ColorPalette = {
  light: {
    bgLight: thCol.lL,
    bg: thCol.l,
    bgStrong: thCol.lS,

    fgLight: thCol.dL,
    fg: thCol.d,
    fgStrong: thCol.dS,
  },
  dark: {
    fgLight: thCol.lL,
    fg: thCol.l,
    fgStrong: thCol.lS,

    bgLight: thCol.dL,
    bg: thCol.d,
    bgStrong: thCol.dS,
  },
  mecca: {
    // blacks, gold, marble white
    fgLight: thCol.dL,
    fg: thCol.d,
    fgStrong: thCol.dS,

    bgLight: thCol.lL,
    bg: thCol.l,
    bgStrong: thCol.lS,
  },
  madina: {
    // blues, light beige, greens
    fgLight: thCol.dL,
    fg: thCol.d,
    fgStrong: thCol.dS,

    bgLight: thCol.lL,
    bg: thCol.l,
    bgStrong: thCol.lS,
  }
}

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

export { COLORS, FONT, SIZES, SHADOWS, THEMES };
