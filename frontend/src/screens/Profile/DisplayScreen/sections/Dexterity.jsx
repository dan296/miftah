import {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {SIZES, FONT, COLORS} from '../../../../constants';
import {ThemeContext, useTheme} from '../../../../contexts/ThemeContext';
import Icon, {Icons} from '../../../../components/icons/Icons';
import {useNavigation} from '@react-navigation/native';

const HANDS = ["right", "left"];

const Dexterity = () => {
  const [parentWidth, setParentWidth] = useState(0);
  const {theme, updateTheme, activeColors} = useTheme();
  const [hand, setHand] = useState("right");

  const handleSwitch = (key) => {
    console.log(key)
    //updateTheme({mode:key}); // Pass the theme key to change the theme mode
  };

  // Calculate square size based on the parent container's width
  const squareSize = parentWidth / 2 - 10; // For a 2x2 grid, divide by 2
  return (
    <View
      style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 20}}
      onLayout={event => {
        // Get the width of the parent container
        const {width} = event.nativeEvent.layout;
        setParentWidth(width);
      }}>
      {HANDS.map(({key, value}) => (
        <TouchableOpacity
          key={key}
          style={{
            ...styles.themeBox,
            width: squareSize,
            height: squareSize,
            padding: 5
          }}
          onPress={() => handleSwitch(value)}
          >
          <Text style={{fontSize: SIZES.medium}}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  themeBox: {
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default Dexterity;
