import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Animated, Dimensions } from 'react-native';
import { COLORS } from '../../../constants';
import Icon from '../../icons/Icons';
//import HapticFeedback from 'react-native-haptic-feedback'; // Import the Haptic Feedback library
import { ThemeContext } from '../../../contexts/ThemeContext';
//import ViewPager from '@react-native-community/viewpager';

const { width } = Dimensions.get('window');

const HeaderScrollCarousel = ({ data }) => {
  if(data == undefined || data.length == 0){
    console.log("returning");
    return
  }
  //console.log(data);
  //return
  //console.log("not returned");
  const {theme} = useContext(ThemeContext);
  let activeColors = COLORS[theme.mode];
  const viewPagerRef = useRef(null);
  const [isFlatListReady, setFlatListReady] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const borderPosition = useRef(new Animated.Value(0)).current;

  const [itemWidth, setItemWidth] = useState(0);

  const handleItemPress = (index) => {
    // Scroll to the desired index
    if (selectedItemIndex === index) {
      setSelectedItemIndex(-1);
    } else {
      viewPagerRef.current.scrollToIndex({viewPosition: 0.5, animated: true, index });
      setSelectedItemIndex(index);
      // Animate the border position to the selected item
      Animated.spring(borderPosition, {
        toValue: index,
        useNativeDriver: false,
        duration: 1000, // Change this value
      }).start();
    }
  };

    // Function to trigger haptic feedback
    //const triggerHapticFeedback = () => {
    //  const options = {
    //    enableVibrateFallback: true, // Enable vibration fallback for non-supported devices  onTouchStart={triggerHapticFeedback}
    //    ignoreAndroidSystemSettings: false,
    //  };
    //  
    //  // Trigger haptic feedback
    //  HapticFeedback.trigger('selection', options);
    //};

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleItemPress(index)} style={[
      styles.buttonContainer,
      selectedItemIndex === index && styles.selectedItem
    ]} 
    onLayout={(event) => {
      // Measure the width of the item and set it to itemWidth
      const width = event.nativeEvent.layout.width;
      setItemWidth(width);
      if(!isFlatListReady){
        setFlatListReady((index == data.length - 1));
      }
      
    }}
    >
      <View style={styles.buttonIcon}>
        <Icon 
          name={item.icon}
          type={item.type}
          size={20}
          style={{margin: 0}}
          color={selectedItemIndex === index ? COLORS.primary : activeColors.fg}
        />
      </View>
      <Text style={[styles.buttonLabel, {color: selectedItemIndex === index ? COLORS.primary : activeColors.fg}]}>{item.label}</Text>
    </TouchableOpacity>
  );

  const handlePageChange = (event) => {
    const newIndex = event.nativeEvent.position;
    setSelectedItemIndex(newIndex);
  };

  return (
    <>
     {/* <ViewPager
        style={styles.viewPager}
        initialPage={0}
        //onPageSelected={handlePageChange} // Handle page change
        //ref={viewPagerRef}
      >
        {data.map((item, index) => (
          <View key={index}>
            {/* Your carousel item content *}
            {/* You may need to adjust the styles *}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Icon
                name={item.icon}
                type={item.type}
                size={20}
                style={{ margin: 0 }}
                color={activeColors.fg}
              />
              <Text style={{ color: activeColors.fg }}>{item.label}</Text>
            </View>
          </View>
        ))}
        </ViewPager>*/}
      {/*
      
      () => {

        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / itemWidth);
          setSelectedItemIndex(newIndex);
        }}
      <Animated.View
        style={[
          styles.border,
          {
            transform: [{ translateX: borderPosition }],
            width: itemWidth
          },
        ]}
      />*/}
    </>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    height: 200,
  },
  buttonContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  buttonIcon: {
    marginTop: 10,
    height: 30, 
    alignItems: "center", 
    justifyContent: "center"
  },
  buttonLabel: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 11,
  },
  selectedItem: {
    borderBottomColor: COLORS.primary,
  },
  border: {
    position: 'absolute',
    height: 2,
    backgroundColor: COLORS.fg,
    bottom: 0,
  },
});

export default HeaderScrollCarousel;
