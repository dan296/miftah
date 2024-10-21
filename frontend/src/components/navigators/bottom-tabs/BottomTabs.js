import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScreenHeaderBtn} from '../..';
import {Icons} from '../../icons/Icons';
import CustomHeader from '../../common/header/CustomHeader';
import SearchHeader from '../../common/header/SearchHeader';
import ProfileNavigation from '../../../navigation/ProfileNavigation';
import {
  ReciteScreen,
  LearnScreen,
  DecksScreen,
  ReadScreen,
} from '../../../screens';
import {SURAHS} from '../../../constants';
import {useContext, useState} from 'react';
import {useTheme} from '../../../contexts/ThemeContext';
import MyTabBarStatic from './MyTabBarStatic';
import MyTabBar from './MyTabBar';
import {ScrollTabs} from '../../../constants/tabs';
import Dropdown from '../../common/inputs/Dropdown';
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const {activeColors} = useTheme();
  const [selectedSurah, setSelectedSurah] = useState(SURAHS[0]);

  const handleSelect = item => {
    setSelectedSurah(item);
  };

  const TabArr = [
    {
      route: 'Decks',
      label: 'Decks',
      type: Icons.MaterialCommunityIcons,
      size: 25,
      activeIcon: 'cards',
      inActiveIcon: 'cards-outline',
      component: DecksScreen,
      headerShown: true,
      headerLeft: (
        <>
          <SearchHeader placehld="Search" capitalize="none" />
        </>
      ),
      headerRight: (
        <>
          <ScreenHeaderBtn
            type={Icons.Feather}
            name={'edit-2'}
            size={18}
            color={activeColors.fg}
          />
          <ScreenHeaderBtn
            type={Icons.AntDesign}
            name={'plus'}
            size={20}
            color={activeColors.fg}
          />
        </>
      ),
      tabs: [],
    },
    {
      route: 'Read',
      label: 'Read',
      type: Icons.Ionicons,
      size: 25,
      activeIcon: 'book',
      inActiveIcon: 'book-outline',
      component: ReadScreen,
      props: {
        surah: selectedSurah,
      },
      headerShown: true,
      headerLeft: <Dropdown items={SURAHS} onSelect={handleSelect} />,
    },
    {
      route: 'Learn',
      label: 'Learn',
      type: Icons.IcoMoon,
      size: 35,
      activeIcon: 'logo',
      inActiveIcon: 'logo',
      component: LearnScreen,
      headerShown: true,
      headerLeft: (
        <>
          <ScreenHeaderBtn
            type={Icons.IcoMoon}
            name={'filter'}
            size={16}
            color={activeColors.fg}
          />
          <SearchHeader placehld="Search" capitalize="none" />
        </>
      ),
      headerRight: (
        <ScreenHeaderBtn
          type={Icons.Ionicons}
          name={'heart-outline'}
          size={20}
          color={activeColors.fg}
        />
      ),
      tabs: ScrollTabs,
    },
    {
      route: 'Recite',
      label: 'Recite',
      type: Icons.Ionicons,
      size: 30,
      activeIcon: 'mic',
      inActiveIcon: 'mic-outline',
      component: ReciteScreen,
      headerShown: true,
      headerLeft: (
        <>
          <SearchHeader placehld="Search" capitalize="none" />
        </>
      ),
      headerRight: (
        <>
          <ScreenHeaderBtn
            type={Icons.Feather}
            name={'edit-2'}
            size={18}
            color={activeColors.fg}
          />
          <ScreenHeaderBtn
            type={Icons.AntDesign}
            name={'plus'}
            size={20}
            color={activeColors.fg}
          />
        </>
      ),
      tabs: [],
    },
    {
      route: 'Profile',
      label: 'Profile',
      type: Icons.FontAwesome,
      size: 25,
      activeIcon: 'user-circle-o',
      inActiveIcon: 'user-o',
      component: ProfileNavigation,
      headerShown: false,
      headerLeft: <></>,
      headerRight: <></>,
      tabs: [],
    },
  ];

  return (
    <Tab.Navigator
      tabBar={props => <MyTabBarStatic {...props} />}
      screenOptions={{
        headerShown: false,
        lazy: true, // Enable lazy loading of screens
        lazyPreloadDistance: 0, // Number of adjacent screens to preload
        cardStyle: {backgroundColor: activeColors.bg},
      }}>
      {TabArr.map((_, index) => {
        return (
          <Tab.Screen
            key={index}
            name={_.route}
            options={{
              tabBarColor: _.tabBarColor,
              tabColor: _.tabBarColor,
              size: _.size,
              headerShown: _.headerShown,
              tabBarIcon: {
                activeIcon: _.activeIcon,
                inActiveIcon: _.inActiveIcon,
                type: _.type,
              },
              headerTitle: '',
              header: () => (
                <CustomHeader
                  headerLeft={_.headerLeft}
                  headerRight={_.headerRight}
                  scrollItems={_.tabs}
                />
              ),
            }}>
            {() => <_.component {..._.props} />}
          </Tab.Screen>
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTabs;
