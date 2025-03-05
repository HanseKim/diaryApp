import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainTabNavigator from './navigators/MainTabNavigator';
import { AppProvider } from './contexts/appContext';
import { RecoilRoot } from 'recoil';
import { initializeNotifications, useFCMListener, setupForegroundNotificationListener } from './utils/notification'; // notification.tsx에서 import

const AuthStack = createStackNavigator();

function App(): React.JSX.Element {
  useEffect(() => {
    async function setupNotifications() {
      await initializeNotifications(); // 알림 권한 요청 & 설정
      setupForegroundNotificationListener(); // 포그라운드 알림 리스너 실행
    }

    LogBox.ignoreAllLogs(); // 불필요한 경고 숨김
    setupNotifications(); // notification.tsx의 초기화 함수 호출
  }, []);

  return (
    <RecoilRoot>
      <AppProvider>
        <NavigationContainer>
          <FCMListenerWrapper />
          <AuthStack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: '#fff' },
            }}
          >
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
            <AuthStack.Screen name="SignUp" component={SignUpScreen} />
            <AuthStack.Screen name="Main" component={MainTabNavigator} />
          </AuthStack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </RecoilRoot>
  );
}

// 🔹 FCM 알림 리스너 감싸기
const FCMListenerWrapper = () => {
  useFCMListener();  // notification.tsx에서 정의된 FCM 리스너 사용
  return null;
};

export default App;
