import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import Icon from '../../icons/Icons';
import { COLORS, FONT } from '../../../constants';
import { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { ThemeContext, useTheme } from '../../../contexts/ThemeContext';

const {width} = Dimensions.get('window');
const MARGIN = 16;
const TAB_BAR_WIDTH = width - 2*MARGIN;
const TAB_WIDTH = TAB_BAR_WIDTH/4; //Depends on how many tabs

function MyTabBarStatic({ state, descriptors, navigation }) {
  const {activeColors} = useTheme();
  const shadow = {shadowColor: activeColors.fg, shadowOffset: { width: 0, height: -1 },
  shadowOpacity: 0.1,
  shadowRadius: 1,
  elevation: 2};
  
  return (
    <View style={[styles.tabBarContainer, shadow, {backgroundColor: activeColors.bg}]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const tabBarIcon = options.tabBarIcon;

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.icon}
            key={route.key}
          >
            <TabIcon 
              tabIcon={tabBarIcon} 
              tabColor={options.tabColor}
              isFocused={isFocused} 
              label={label} 
              index={state.index}
              size={options.size}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabIcon = ({isFocused, tabIcon, label, index, tabColor, size=20}) => {
  const {activeColors} = useTheme();
    return (
      <>
        <Icon 
            name={isFocused ? tabIcon.activeIcon : tabIcon.inActiveIcon}
            type={tabIcon.type}
            size={size}
            color={isFocused ? activeColors.fg : COLORS.gray}
        />
        {isFocused ?
          (<Text style={[styles.text, {color: activeColors.fg}]}>
                {label}  
          </Text>) : (<></>)
        }
      </>
    )
}

const styles = StyleSheet.create({
    tabBarContainer: {
      flexDirection: 'row',
      width: TAB_BAR_WIDTH,
      height:60,
      alignSelf: 'center',
      bottom: 0,
      borderRadius: 0,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: "100%"
    },
    icon: {
        alignItems: "center",
        flex: 1,
        height: '100%',
        alignContent: "center",
        justifyContent: "center",
    },
    text: {
      top: 0, 
      fontSize: 10,
      color: COLORS.primary,
      fontFamily: FONT.medium
    },
  })

export default MyTabBarStatic