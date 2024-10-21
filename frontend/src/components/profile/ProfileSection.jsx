import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { SIZES, FONT, COLORS } from '../../constants';
import { ThemeContext, useTheme } from '../../contexts/ThemeContext';
import Icon, { Icons } from '../icons/Icons';
import { useNavigation } from '@react-navigation/native';

const ProfileSection = ({title, tabs}) => {
  const {activeColors} = useTheme();
  const navigation = useNavigation();
  return (
    <>
      <View style={[styles.subwrap, styles.subwrapSmall, {borderBottomWidth: 0, paddingTop: 40, paddingBottom: 0}]}>
        <Text style={[styles.sectionTitle ,{ color: activeColors.fg, flex: 1 }]}>{title}</Text>
      </View>
      {tabs.map((_, index) => {
        const scrn = _.label.trim()
        return (
          <View key={index} style={styles.subwrap}>
            <TouchableOpacity style={[styles.touchWrap, styles.subwrapSmall]} onPress={() => {navigation.navigate("ProfileNext", { title: scrn })}}>
            <Icon 
              name={_.icon}
              type={_.iconType}
              size={20}
              color={activeColors.fg}
            />
            <View style={{flex: 1, paddingHorizontal: SIZES.medium}}>
              <Text style={[styles.label ,{ color: activeColors.fg }]}>{_.label}</Text>
            </View>
            <Icon 
              name="right"
              type={Icons.AntDesign}
              size={15}
              color={activeColors.fg}
            />
          </TouchableOpacity>
          </View>
        )
      })}
      
    </>
  )
}

const styles = StyleSheet.create({
    subwrap: {
      flexDirection: "row", 
      alignItems: "center",
      borderColor: COLORS.gray, 
      borderBottomWidth: 1
    },
    subwrapLarge: {
      paddingVertical: SIZES.xLarge, 
      borderBottomWidth: 0
    },
    subwrapMedium: {
      paddingVertical: SIZES.large, 
    },
    subwrapSmall: {
      paddingVertical: SIZES.medium, 
    },
    touchWrap: {
      flex: 1, 
      flexDirection: "row",
      alignItems: "center",
    },
    userName: {
      fontFamily: FONT.regular,
      fontSize: SIZES.large,
      color: COLORS.secondary,
    },
    label: {
      fontFamily: FONT.regular,
      fontSize: SIZES.medium,
      color: COLORS.secondary,
    },
    text:{
      fontFamily: FONT.regular,
      fontSize: SIZES.medium
    },
    title: {
      fontFamily: FONT.bold,
      fontSize: SIZES.xxLarge
    },
    sectionTitle: {
      fontFamily: FONT.bold,
      fontSize: SIZES.xLarge
    },
    welcomeMessage: {
      fontFamily: FONT.regular,
      fontSize: SIZES.medium,
      textAlign: "center",
      },
      welcomeSelect: (activeWelcomeSelect, item) => ({
          paddingVertical: SIZES.small / 2,
          paddingHorizontal: SIZES.small,
          borderRadius: SIZES.medium,
          opacity: activeWelcomeSelect === item ? 1 : 0.5,
      }),
    searchContainer: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      height: 50,
    },
    searchWrapper: {
      flex: 1,
      backgroundColor: COLORS.bg,
      marginRight: SIZES.small,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: SIZES.medium,
        height: "100%",
        maxWidth: 300,
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
      tintColor: COLORS.bg,
    },
    tabsContainer: {
      width: "100%",
        marginTop: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    tab: (activeJobType, item) => ({
      paddingVertical: SIZES.small / 2,
      paddingHorizontal: SIZES.small,
      borderRadius: SIZES.medium,
      borderWidth: 1,
      borderColor: activeJobType === item ? COLORS.secondary : COLORS.gry,
    }),
    tabText: (activeJobType, item) => ({
      fontFamily: FONT.medium,
      color: activeJobType === item ? COLORS.secondary : COLORS.gray,
    }),
  });

export default ProfileSection