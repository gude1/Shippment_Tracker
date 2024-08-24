import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootBottomTabParamList} from '../../navigation/RootBottomTabNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackNavigator';

type WalletScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, 'Wallet'>,
  NativeStackScreenProps<RootStackParamList>
>;

const Wallet = ({}: WalletScreenProps) => {
  return (
    <View>
      <Text>Wallet</Text>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({});
