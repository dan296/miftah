import { useContext, useRef, useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet,
    Animated
} from 'react-native'
import { COLORS, SIZES, FONT, images } from '../../constants';
import { useTheme } from '../../contexts/ThemeContext';
import { ScrollView, Switch } from 'react-native-gesture-handler';
import Icon, { Icons } from '../../components/icons/Icons';
import { SECTIONS } from '../../constants';
import DisappearingHeader from '../../components/common/header/DisappearingHeader';
import { SURAHS } from '../../constants/surahs';

const testData = SURAHS;

const LearnScreen = () => {
  const {activeColors} = useTheme();

  return (
    <FlatList
      data={testData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        return (
          <View style={[styles.subwrap, {backgroundColor: activeColors.bgLight}]}>
            <TouchableOpacity style={[styles.touchWrap, styles.subwrapMedium]}>
              <Icon 
              name={item.iconName}
              type={item.iconType}
              />
              <View style={{ flex: 1, flexDirection: 'column', paddingHorizontal: SIZES.medium, justifyContent: 'center' }}>
                <Text style={[styles.userName, { color: activeColors.fg }]}>{item.englishName}</Text>
                <Text style={[styles.text, { color: activeColors.fg, opacity: 0.75, fontSize: SIZES.small }]}>
                  {item.englishNameTranslation}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'column', paddingHorizontal: SIZES.medium, justifyContent: 'right' }}>
                <Text style={[styles.userName, { color: activeColors.fg, textAlign: "right" }]}>{item.name.replace("سُورَةُ ","")}</Text>
                <Text style={[styles.text, { color: activeColors.fg, opacity: 0.75, fontSize: SIZES.small, textAlign: "right" }]}>
                  {item.ayahs.length} ayahs
                </Text>
              </View>
              <View style={[styles.diamond, {backgroundColor: activeColors.fg, borderColor: activeColors.bg}]}>
                <Text style={[styles.number, {color: activeColors.bg}]}>{index+1}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      }}
      style={{ flex: 1, paddingHorizontal: SIZES.xLarge, backgroundColor: activeColors.bg, paddingVertical: 10, marginBottom: 20 }}
    />
  )
}

const styles = StyleSheet.create({
  subwrap: {
    flexDirection: "row", 
    alignItems: "center",
    borderColor: COLORS.gray,
    margin: 10,
    paddingHorizontal: 20,
    borderRadius: 5
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
    fontSize: SIZES.medium,
    color: COLORS.secondary,
  },
  label: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.secondary,
  },
  userImage: { width: 80, height: 60, resizeMode: "cover", borderRadius: 5},
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
  header: {
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60, // Adjust as needed
  },
  diamond: {
    width: 24,
    height: 24,
    transform: "rotate(45deg)",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "blue",
    opacity: 0.65
  },
  number: {
    fontSize: 10,
    transform: "rotate(-45deg)",
  },
});

export default LearnScreen;