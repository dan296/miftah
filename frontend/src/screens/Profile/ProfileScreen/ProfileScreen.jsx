import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {COLORS, SIZES, FONT, images, SECTIONS} from '../../../constants';
import {useTheme} from '../../../contexts/ThemeContext';
import {ScrollView} from 'react-native-gesture-handler';
import Icon, {Icons} from '../../../components/icons/Icons';
import CustomButton from '../../../components/common/buttons/CustomButton';
import {Auth} from 'aws-amplify';
import {ProfileSection} from '../../../components';

const ProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const {activeColors} = useTheme();

  const onSignOutPressed = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await Auth.signOut();
      console.log(response);
    } catch (e) {
      Alert.alert('oops', e.message);
    }
    setLoading(false);
  };

  return (
    <ScrollView
      style={{backgroundColor: activeColors.bg, padding: SIZES.xLarge}}
      showsVerticalScrollIndicator={false}>
      <View style={{flex: 1, marginBottom: 15}}>
        <View style={[styles.subwrap, styles.subwrapLarge]}>
          <Text style={[styles.title, {color: activeColors.fg, flex: 1}]}>
            Profile
          </Text>
          <Icon
            name="notifications-outline"
            type={Icons.Ionicons}
            size={30}
            color={activeColors.fg}
          />
        </View>
        <View style={styles.subwrap}>
          <TouchableOpacity style={[styles.touchWrap, styles.subwrapMedium]}>
            <Image
              source={images.profile}
              resizeMode="cover"
              width={60}
              height={60}
              style={{
                width: 60,
                height: 60,
                resizeMode: 'cover',
                borderRadius: 30,
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                paddingHorizontal: SIZES.medium,
                justifyContent: 'center',
              }}>
              <Text style={[styles.userName, {color: activeColors.fg}]}>
                Daniyal
              </Text>
              <Text
                style={[
                  styles.text,
                  {
                    color: activeColors.fg,
                    opacity: 0.75,
                    fontSize: SIZES.small,
                  },
                ]}>
                Show profile
              </Text>
            </View>
            <Icon
              name="right"
              type={Icons.AntDesign}
              size={20}
              color={activeColors.fg}
            />
          </TouchableOpacity>
        </View>

        {SECTIONS.map((_, index) => {
          return <ProfileSection key={index} title={_.title} tabs={_.tabs} />;
        })}
      </View>
      <CustomButton
        onPress={onSignOutPressed}
        text={loading ? 'Signing Out...' : 'Sign Out'}
        bgColor={loading ? activeColors.bg : activeColors.bgLight}
        fgColor={activeColors.fg}
        icon={{
          name: 'sign-in',
          type: Icons.Octicons,
          size: 20,
          color: activeColors.fg,
        }}
      />
    </ScrollView>
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
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  label: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.secondary,
  },
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

export default ProfileScreen;
