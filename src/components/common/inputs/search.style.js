import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.small,
    height: 40,
    width: "100%",
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.secondaryDark,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
      height: "100%",
      maxWidth: 500,
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
      height: "100%",
      paddingHorizontal: SIZES.medium,
      textAlign: "center",
      textTransform: 'uppercase'
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  }
});

export default styles;
