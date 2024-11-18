import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {SIZES} from '../../constants';
import {useTheme} from '../../contexts/ThemeContext';
import Icon, {Icons} from '../../components/icons/Icons';
import styles from './index.styles';
import {Surah} from '../../interfaces/surah';

const testData = [1, 2, 3, 4];

function arabicDigits(num: number) {
  const nums: string[] = num.toString().split('');
  var final = [];
  var arabnums = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  for (var i = 0; i < nums.length; i++) {
    final.push(arabnums[parseInt(nums[i])]);
  }
  return final.join('');
}

const ReadScreen = (surah: Surah) => {
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
              <TouchableOpacity>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                  <Icon
                    name="play"
                    type={Icons.Ionicons}
                    size={16}
                    style={{flex: 1, paddingLeft: 7}}
                    color={activeColors.fg}
                  />
                  <View>
                    <Text style={[{color: activeColors.fg, opacity: 0.75}]}>
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
                    style={[{color: activeColors.fg, fontSize: SIZES.medium}]}>
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

export default ReadScreen;
