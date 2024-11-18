import React from 'react';
import {StyleSheet, View, Text, TextStyle, ViewStyle, StyleProp} from 'react-native';
import {COLORS, FONT, SIZES} from '../../constants';

// Define the styles type
type Styles = {
  subwrap: StyleProp<ViewStyle>;
  userName: StyleProp<TextStyle>;
};
const styles: Styles = StyleSheet.create({
  subwrap: {
    borderTopWidth: 1,
    borderColor: '#3d3d3d',
    paddingBottom: 40,
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
    textAlign: 'center',
  }
});

export default styles;