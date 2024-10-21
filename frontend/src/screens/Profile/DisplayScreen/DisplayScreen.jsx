import { useContext, useState } from 'react'
import { SIZES } from '../../../constants';
import { useTheme } from '../../../contexts/ThemeContext';
import { ScrollView, Switch } from 'react-native-gesture-handler';
import { ProfileHeader } from '../../../components';
import DisplaySection from './components/DisplaySection';
import Themes from './sections/Themes';
import { Icons } from '../../../components/icons/Icons';
import Dexterity from './sections/Dexterity';

const sections = [
  {
    label: "Themes",
    icon: "check",
    iconType: Icons.AntDesign,
    children: <Themes />
  },
  {
    label: "Dexterity",
    icon: "check",
    iconType: Icons.AntDesign,
    children: <Dexterity />
  }
]

const DisplayScreen = ({route}) => {
  const {theme, updateTheme, activeColors} = useTheme();
  const [themeMode, setThemeMode] = useState(theme.mode === "dark");

  const handleSwitch = () => {
      updateTheme();
      setThemeMode((previousState) => !previousState)
  }
    return (
      <ScrollView style={{backgroundColor: activeColors.bg, padding: SIZES.xLarge}}  showsVerticalScrollIndicator={false} >
        <ProfileHeader title={route.params.title}/>
        <DisplaySection _={sections[0]} />
        <DisplaySection _={sections[1]} />
        <Switch
          value={themeMode}
          onValueChange={handleSwitch}
        />
      </ScrollView>
  )
}

export default DisplayScreen