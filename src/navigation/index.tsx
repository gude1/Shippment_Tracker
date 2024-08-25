import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStackNavigator from './RootStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import BootSplash from 'react-native-bootsplash';
import FlashMessage from 'react-native-flash-message';
import {UserContext} from '../context/UserContext';
import {useContext} from 'react';

const Navigation = () => {
  const context = useContext(UserContext);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
    },
  };
  return (
    <NavigationContainer
      theme={MyTheme}
      onReady={() => {
        BootSplash.hide();
      }}>
      {context?.user?.full_name ? (
        <RootStackNavigator />
      ) : (
        <AuthStackNavigator />
      )}
      <FlashMessage statusBarHeight={45} />
    </NavigationContainer>
  );
};

export default Navigation;
