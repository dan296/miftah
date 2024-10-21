import React, {useContext} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SIZES, FONT, images} from '../../constants';
import {useTheme} from '../../contexts/ThemeContext';
import Icon, {Icons} from '../../components/icons/Icons';

const ReciteScreen = () => {
  const {activeColors} = useTheme();

  return (
    <View style={[styles.subwrap, {backgroundColor: activeColors.bg}]}>
      <TouchableOpacity style={[styles.touchWrap, styles.subwrapMedium]}>
        <Icon
          name="microphone"
          type={Icons.Ionicons}
          size={16}
          style={{flex: 1, paddingLeft: 7}}
          color={activeColors.fg}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  subwrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.gray,
    borderBottomWidth: 1,
  },
  subwrapLarge: {
    paddingVertical: SIZES.xLarge,
    borderBottomWidth: 0,
  },
  subwrapMedium: {
    paddingVertical: SIZES.large,
  },
  subwrapSmall: {
    paddingVertical: SIZES.medium,
  },
  touchWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
    color: COLORS.secondary,
  },
  label: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.secondary,
  },
  userImage: {width: 60, height: 60, resizeMode: 'cover', borderRadius: 60},
  text: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
  },
  sectionTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
  },
  welcomeMessage: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    textAlign: 'center',
  },
  welcomeSelect: (activeWelcomeSelect, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    opacity: activeWelcomeSelect === item ? 1 : 0.5,
  }),
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.bg,
    marginRight: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.medium,
    height: '100%',
    maxWidth: 300,
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: '100%',
    height: '100%',
    paddingHorizontal: SIZES.medium,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  searchBtn: {
    width: 50,
    height: '100%',
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtnImage: {
    width: '50%',
    height: '50%',
    tintColor: COLORS.bg,
  },
  tabsContainer: {
    width: '100%',
    marginTop: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
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

export default ReciteScreen;
