import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import Icon from '../../icons/Icons';
import { COLORS } from '../../../constants';
import { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { ThemeContext } from '../../../contexts/ThemeContext';

const {width} = Dimensions.get('window');
const MARGIN = 16;
const TAB_BAR_WIDTH = width - 2*MARGIN;
const TAB_WIDTH = TAB_BAR_WIDTH/4; //Depends on how many tabs

function MyTabBar({ state, descriptors, navigation }) {
  const {theme} = useContext(ThemeContext);
  let activeColors = COLORS[theme.mode];
  const [translateX] = useState(new Animated.Value(0));

  const translateTab = (index) => {
      Animated.spring(translateX, {
          toValue: index*TAB_WIDTH,
          useNativeDriver: true
      }).start();
  }

  useEffect(() => {
      translateTab(state.index)
  }, [state.index])

  return (
    <SafeAreaView>
    <View style={[styles.tabBarContainer]}>
        <Animated.View style={[styles.slidingTabContainer, {transform: [{translateX}]}]} >
            <Animated.View style={styles.slidingTab} />
        </Animated.View>
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
    </SafeAreaView>
  );
}

const TabIcon = ({isFocused, tabIcon, label, index, tabColor, size=20}) => {
    const [translateY] = useState(new Animated.Value(0));
    const {theme} = useContext(ThemeContext);
    let activeColors = COLORS[theme.mode];
    const translateIcon = (val) => {
        Animated.spring(translateY, {
            toValue: val,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
       isFocused ? translateIcon(-14) : translateIcon(0)
    }, [index])
    return (
        <>
            <Animated.View style={[{transform: [{translateY}]}]} > 
                <Icon 
                    name={isFocused ? tabIcon.activeIcon : tabIcon.inActiveIcon}
                    type={tabIcon.type}
                    size={size}
                    color={isFocused ? "white" : COLORS.gray}
                />
            </Animated.View>
            {isFocused ?
            (<Text style={[styles.text]}>
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
      height: 40,
      position: 'absolute',
      alignSelf: 'center',
      bottom: 5,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'space-around'
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
      color: "white"
    },
    slidingTabContainer: {
        width: TAB_WIDTH,
        ...StyleSheet.absoluteFillObject,
        ///backgroundColor: "gray", can use later maybe
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 10
    },
    slidingTab: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        bottom: 20,
        borderWidth: 2,
        borderColor: "white"
    }
  })

export default MyTabBar