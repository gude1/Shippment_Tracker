import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoard from '../screens/auth/OnBoard';
import Login from '../screens/auth/Login';

export type AuthStackParamList = {
  Login: undefined;
  OnBoard: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        // statusBarStyle: 'dark',
        animation: 'slide_from_right',
        orientation: 'portrait',
        // statusBarColor: 'white',
      }}>
      <AuthStack.Screen name="OnBoard" component={OnBoard} />
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
