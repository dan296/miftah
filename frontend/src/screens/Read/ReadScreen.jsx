import {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {COLORS, SIZES, FONT, images, SURAHS} from '../../constants';
import Search from '../../components/common/inputs/Search';
import {useTheme} from '../../contexts/ThemeContext';
import {ScrollView, Switch} from 'react-native-gesture-handler';
import Icon, {Icons} from '../../components/icons/Icons';
import Dropdown from '../../components/common/inputs/Dropdown';

const testData = [1, 2, 3, 4];

function arabicDigits(num) {
  num = num.toString().split('');
  var final = [];
  var arabnums = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  for (var i = 0; i < num.length; i++) {
    final.push(arabnums[parseInt(num[i])]);
  }
  return final.join('');
}

const ReadScreen = ({surah}) => {
  const {activeColors} = useTheme();


  // Determine the justifyContent value based on screen width
  return (
    <FlatList
      data={surah.ayahs}
      keyExtractor={(item, index) => surah.englishName + index.toString()}
      renderItem={({item, index}) => {
        return (
          <>
            {index == 0 && surah.number != 9 && surah.number != 1 ? (
              <View
                style={[
                  styles.subwrap,
                  {
                    alignItems: 'center',
                    borderTopWidth: 0,
                    padding: 0,
                    paddingBottom: 10,
                  },
                ]}>
                <Text style={{color: activeColors.fg, fontSize: SIZES.large}}>
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ{' '}
                </Text>
              </View>
            ) : (
              <></>
            )}
            <View style={[styles.subwrap]}>
              <TouchableOpacity
                style={[styles.touchWrap, styles.subwrapMedium]}>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                  <Icon
                    name="play"
                    type={Icons.Ionicons}
                    size={16}
                    style={{flex: 1, paddingLeft: 7}}
                    color={activeColors.fg}
                  />
                  <View>
                    <Text
                      style={[
                        styles.number,
                        {color: activeColors.fg, opacity: 0.75},
                      ]}>
                      {surah.number}:{index + 1}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={[
                      styles.userName,
                      {
                        color: activeColors.fg,
                        textAlign: 'right',
                        fontSize: SIZES.xxLarge,
                        paddingVertical: SIZES.medium,
                      },
                    ]}>
                    {index == 0
                      ? item.arab_text.replace(
                          'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ',
                          '',
                        )
                      : item.arab_text}
                    <View
                      style={{
                        marginRight: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: activeColors.fg}}>۝</Text>
                      <Text
                        style={{
                          position: 'absolute',
                          fontSize: SIZES.xSmall,
                          paddingTop: 3,
                          color: activeColors.fg,
                        }}>
                        {arabicDigits(index + 1)}
                      </Text>
                    </View>
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      {color: activeColors.fg, fontSize: SIZES.medium},
                    ]}>
                    {index == 0 ? item.text : item.text}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        );
      }}
      style={{flex: 1, backgroundColor: activeColors.bg, padding: 10}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.large,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wrapper: {
    flexDirection: 'column',
    marginVertical: SIZES.xxLarge,
  },
  subwrap: {
    borderTopWidth: 1,
    borderColor: '#3d3d3d',
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    height: 'auto',
    resizeMode: 'cover',
    aspectRatio: 3 / 2,
    borderRadius: 15,
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
    textAlign: 'center',
  },
  welcomeMessage: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.primary,
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
  sellerImage: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 20,
  },
});

export default ReadScreen;
