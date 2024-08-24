import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type RootStackParamList = {};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator>
      <></>
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
