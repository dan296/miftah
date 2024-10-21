import { useContext, useState } from 'react'
import { COLORS, SIZES, FONT, images } from '../../../constants';
import { useTheme } from '../../../contexts/ThemeContext';
import { ScrollView, Switch } from 'react-native-gesture-handler';
import { ProfileHeader } from '../../../components';

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
        <Switch
          value={themeMode}
          onValueChange={handleSwitch}
        />
      </ScrollView>
  )
}

export default DisplayScreen