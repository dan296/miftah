import React, { useContext } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from '../../../constants';
import HeaderScroll from './HeaderScroll';
import { useTheme } from '../../../contexts/ThemeContext';
import HeaderScrollCarousel from './HeaderScrollCarousel';

const CustomHeader = ({ headerLeft, headerRight, scrollItems }) => {
  const {activeColors} = useTheme();
  const shadow = {shadowColor: activeColors.fg, shadowOffset: { width: 0, height: -1 },
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 2};
  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: activeColors.bg}, shadow]}>
      <View style={[styles.header]}>
        <View style={{flex: 1, flexDirection: 'row', alignItems:"center", gap: 5}}>
          {headerLeft}
        </View>
        {headerRight ? (
          <View style={{flexDirection: 'row', gap: 5}}>
            {headerRight}
          </View>
        ) : null}
      </View>
      {scrollItems ? (
          <HeaderScroll data={scrollItems}/>
        ) : null}
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    /*shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2,*/
    
  },
  header: {
    height: 60, // Adjust the header height as needed
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5, // Adjust the padding as needed
    paddingHorizontal: 15,
    gap: 5
  },
});

export default CustomHeader;
