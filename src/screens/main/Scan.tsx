import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootBottomTabParamList} from '../../navigation/RootBottomTabNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackNavigator';

type ScanScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, 'Scan'>,
  NativeStackScreenProps<RootStackParamList>
>;
const Scan = ({}: ScanScreenProps) => {
  return (
    <View>
      <Text>Scan</Text>
    </View>
  );
};

export default Scan;

const styles = StyleSheet.create({});
