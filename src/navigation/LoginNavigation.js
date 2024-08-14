import { SafeAreaView } from 'react-native';
import { COLORS,THEMES, icons, images, SIZES } from '../constants';
import { ConfirmEmailScreen, ForgotPasswordScreen, ResetPasswordScreen, SignInScreen, SignUpScreen } from '../screens/Login';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { useContext } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Create a stack navigator
const Stack = createStackNavigator();

function LoginNavigation() {
  const { activeColors } = useTheme();
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator 
        initialRouteName="SignIn"
        screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Specify sliding animation
            headerShown: false,
            cardStyle: {backgroundColor: activeColors.bg}
        }}
      >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
        <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
        <Stack.Screen name="Reset" component={ResetPasswordScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

export default LoginNavigation;