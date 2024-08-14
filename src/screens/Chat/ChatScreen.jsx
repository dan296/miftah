import React, { useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONT, images } from '../../constants';
import { useTheme } from '../../contexts/ThemeContext';
import Icon, { Icons } from '../../components/icons/Icons';

const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const ChatScreen = () => {
  const { activeColors } = useTheme();
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.subwrap}>
        <TouchableOpacity style={[styles.touchWrap, styles.subwrapMedium]}>
          <Image
            source={images.profile}
            resizeMode="cover"
            width={60}
            height={60}
            style={styles.userImage}
          />

          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              paddingHorizontal: SIZES.medium,
              justifyContent: 'center',
            }}
          >
            <Text style={[styles.userName, { color: activeColors.fg }]}>
              Daniyal
            </Text>
            <Text style={[styles.userName, { color: activeColors.fg }]}>
              Kurta
            </Text>
            <Text
              style={[
                styles.text,
                { color: activeColors.fg, opacity: 0.75, fontSize: SIZES.small },
              ]}
            >
              When would you be avail...
            </Text>
          </View>
          <Text
            style={{
              color: activeColors.fg,
              opacity: 0.5,
              fontSize: SIZES.small,
              alignSelf: 'flex-end',
            }}
          >
            Received May 23
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={testData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      style={{ backgroundColor: activeColors.bg, paddingHorizontal: SIZES.xLarge }}
      showsVerticalScrollIndicator={false}
    />
  );
};

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
        fontFamily: FONT.bold,
        fontSize: SIZES.small,
        color: COLORS.secondary,
      },
      label: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.secondary,
      },
      userImage: { width: 60, height: 60, resizeMode: "cover", borderRadius: 60 },
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

export default ChatScreen;
