import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type AuthStackParamList = {};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator>
      <></>
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
