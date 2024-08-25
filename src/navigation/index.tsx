import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStackNavigator from './RootStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import FlashMessage from 'react-native-flash-message';
import {UserContext} from '../context/UserContext';
import {useContext} from 'react';

const Navigation = () => {
  const context = useContext(UserContext);
  return (
    <NavigationContainer>
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
