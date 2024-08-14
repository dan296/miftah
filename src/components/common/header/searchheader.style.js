import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
    flexDirection: "row",
    height: 40,
    flex: 1,
    paddingHorizontal: 0,
  },
  searchWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    height: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
    textAlign: "center",
    textTransform: 'uppercase',
    color: COLORS.fg,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0
  }
});

export default styles;
