import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootBottomTabNavigator from './RootBottomTabNavigator';

export type RootStackParamList = {
  RootTab: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="RootTab" component={RootBottomTabNavigator} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
