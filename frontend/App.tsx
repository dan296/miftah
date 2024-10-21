import {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Appearance,
  StatusBar,
  Text,
  Image,
  useColorScheme,
} from 'react-native';
import {THEMES, COLORS, images, SIZES} from './src/constants';
import {LoginNavigation, AppNavigation} from './src/navigation';
import {createStackNavigator} from '@react-navigation/stack';
import {ActivityIndicator} from 'react-native';
import {ThemeProvider, useTheme} from './src/contexts/ThemeContext';
import NetInfo from '@react-native-community/netinfo';
import Icon, {Icons} from './src/components/icons/Icons';
import Logo from './assets/images/logo-transparent.png';
import {NavigationContainer} from '@react-navigation/native';
import {NetworkIndicator, LoadingIndicator} from './src/components/indicators';
// @ts-ignore
import {Amplify, Auth, Hub} from 'aws-amplify';
import config from './src/aws-exports';
import { initializeDatabase } from './src/db';

Amplify.configure(config);
const Stack = createStackNavigator();

interface Data {
  payload: {
    event: string;
  };
}

function Nav(user: any) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{
          headerShown: false,
        }}>
        {user ? (
          <Stack.Screen name="app" component={AppNavigation} />
        ) : (
          <Stack.Screen name="login" component={LoginNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const {theme} = useTheme();
  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = (data: Data) => {
      console.log(data);
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    };

    //const hubListenerCancelToken = Hub.listen('auth', listener);
    //return hubListenerCancelToken();
  }, []);

  // State to track the network connection status
  const [isConnected, setIsConnected] = useState(true); // Assume initially connected
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  // Check network status
  const checkNetworkStatus = async () => {
    const netInfoState = await NetInfo.fetch();
    const isConnected = netInfoState.isConnected ?? false;
    setIsConnected(isConnected);
    setInitialCheckDone(true);
  };

  // Listen for network changes
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Perform initial network check
  useEffect(() => {
    checkNetworkStatus();
    const setupDatabase = async () => {
      try {
        await initializeDatabase();
        console.log('Database initialized successfully');
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };

    setupDatabase();
  }, []);

  /*return (
        <SafeAreaView style={{ flex: 1, backgroundColor: THEMES[theme.mode].bg }}>
            <StatusBar
                animated={true}
                backgroundColor={THEMES[theme.mode].bg}
                barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
                showHideTransition={"fade"}
                hidden={false}
            />
            <NavigationContainer>
                <Stack.Navigator 
                    initialRouteName='login' 
                    screenOptions={{ 
                        headerShown: false,
                    }} 
                >
                    {user ? 
                    (<Stack.Screen name="app" component = {AppNavigation} />) : 
                    (<Stack.Screen name="login" component = {LoginNavigation} />)
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )*/
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: THEMES[theme.mode].bg}}>
      <StatusBar
        animated={true}
        backgroundColor={THEMES[theme.mode].bg}
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        showHideTransition={'fade'}
        hidden={false}
      />
      {!isConnected ? (
        <NetworkIndicator />
      ) : user === undefined ? (
        <LoadingIndicator />
      ) : (
        <Nav user={user} />
      )}
    </SafeAreaView>
  );
}

const RootApp = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default RootApp;
