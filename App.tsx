import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import MainTabNavigator from './navigators/MainTabNavigator';
import DiaryDetailScreen from './screens/DiaryDetail';
import SignUpScreen from './screens/SignUpScreen';
import RegisterScreen from './screens/RegisterScreen';
import { initializeNotifications, useFCMListener } from './utils/notification';
import { AppProvider } from './contexts/appContext'
import MessageScreen from './screens/MessageScreen';
import { WriteDiaryScreen } from './screens/WriteDiaryScreen';
import EditDiaryScreen from './screens/EditDiaryScreen';
import { RecoilRoot } from 'recoil';

type RootStackParamList = {
  Login: undefined,
  Register: undefined,
  Main: undefined,
  Detail: undefined,
  SignUp: undefined,
  Message: undefined,
  WriteDiaryScreen: undefined
  EditDiaryScreen: undefined
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  useEffect(() => {
    initializeNotifications();
  }, []);

  return (
    <RecoilRoot>
      <AppProvider>
        {/* 💡 여기서 useFCMListener() 실행해야 함 */}
        <FCMListenerWrapper />

        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: '#fff' }
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen name="Detail" component={DiaryDetailScreen} />
            <Stack.Screen name="Message" component={MessageScreen} />
            <Stack.Screen name="WriteDiaryScreen" component={WriteDiaryScreen} />
            <Stack.Screen name="EditDiaryScreen" component={EditDiaryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </RecoilRoot>
  );
}

// 💡 `RecoilRoot` 내부에서 `useFCMListener()` 실행
const FCMListenerWrapper = () => {
  useFCMListener();
  return null;
};


export default App;