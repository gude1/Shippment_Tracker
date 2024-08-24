import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';
import Shipment from '../screens/main/Shipment';
import Scan from '../screens/main/Scan';
import Wallet from '../screens/main/Wallet';
import Profile from '../screens/main/Profile';

export type RootBottomTabParamList = {
  Shipment: undefined;
  Scan: undefined;
  Wallet: undefined;
  Profile: undefined;
};

type TabIconParams = {
  focused: boolean;
  style?: StyleProp<ImageStyle>;
  color: string;
  size: number;
  source: ImageSourcePropType;
};

const RootBottomTab = createBottomTabNavigator<RootBottomTabParamList>();

const RootBottomTabNavigator = () => {
  const renderTabIcon = ({focused, source, style}: TabIconParams) => {
    return (
      <Image
        style={[
          styles.iconImg,
          {tintColor: focused ? '#2F50C1' : '#A7A3B3'},
          style,
        ]}
        source={source}
      />
    );
  };
  return (
    <RootBottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#5B4CCC',
        tabBarInactiveTintColor: '#A7A3B3',
      }}>
      <RootBottomTab.Screen
        name="Shipment"
        component={Shipment}
        options={{
          tabBarLabel: 'Shipment',
          tabBarIcon(props) {
            return renderTabIcon({
              ...props,
              source: require('../assets/images/shipment.png'),
              style: {width: 24.61},
            });
          },
        }}
      />

      <RootBottomTab.Screen
        name="Scan"
        component={Scan}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon(props) {
            return renderTabIcon({
              ...props,
              source: require('../assets/images/scan.png'),
              style: {width: 31.66},
            });
          },
        }}
      />

      <RootBottomTab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon(props) {
            return renderTabIcon({
              ...props,
              source: require('../assets/images/wallet.png'),
              style: {width: 30.22},
            });
          },
        }}
      />

      <RootBottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon(props) {
            return renderTabIcon({
              ...props,
              source: require('../assets/images/profile.png'),
              style: {width: 25},
            });
          },
        }}
      />
    </RootBottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconImg: {
    width: 30,
    height: 25,
  },

  tabLabel: {
    fontFamily: 'SF-Pro-Text-Regular',
    lineHeight: 13,
    fontSize: 11,
    letterSpacing: 0.07,
  },

  tabBar: {
    borderTopWidth: 1,
    borderColor: '#EAE7F2',
  },
});

export default RootBottomTabNavigator;
