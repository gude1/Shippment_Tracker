/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';

import Navigation from './src/navigation';
import {UserProvider} from './src/context/UserContext';

function App(): React.JSX.Element {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
