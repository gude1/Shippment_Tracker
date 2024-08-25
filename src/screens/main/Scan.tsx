import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Scan</Text>
      </View>
    </SafeAreaView>
  );
};

export default Scan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
