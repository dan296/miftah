import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  btnContainer: {
    width: 39,
    height: 39,
    margin: 0,
    borderRadius: 50,//SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: COLORS.gray
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.25,
  }),
});

export default styles;
