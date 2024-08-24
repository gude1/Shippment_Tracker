import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export type RootBottomTabParamList = {};

const RootBottomTab = createBottomTabNavigator<RootBottomTabParamList>();

const RootBottomTabNavigator = () => {
  return (
    <RootBottomTab.Navigator>
      <></>
    </RootBottomTab.Navigator>
  );
};

export default RootBottomTabNavigator;
