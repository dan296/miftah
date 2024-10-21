import { Text } from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { useContext } from "react";
import { COLORS, FONT } from "../../../constants";

const FgText = ({ text, style }) => {
  const {activeColors} = useTheme();
  return (
      <Text style={[{color: activeColors.fg, fontFamily: FONT.regular,}, style]}>{text}</Text>
  )
}

export default FgText