import { SafeAreaView } from 'react-native';
import { COLORS, SECTIONS } from '../constants';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { DisplayScreen, ProfileScreen } from '../screens/Profile';

// Create a stack navigator
const Stack = createStackNavigator();

function ProfileNavigation() {
  const allLabels = [];

  SECTIONS.forEach(section => {
    section.tabs.forEach(tab => {
      allLabels.push(tab.label);
    });
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <Stack.Navigator 
        initialRouteName="ProfileMenu"
        screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Specify sliding animation
            headerShown: false,
            cardStyle: {backgroundColor: COLORS.primary}
        }}
      >
        <Stack.Screen name="ProfileMenu" component={ProfileScreen} />
        <Stack.Screen 
          name="ProfileNext"
          component={DisplayScreen} 
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

export default ProfileNavigation;