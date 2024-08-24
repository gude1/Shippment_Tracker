import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootBottomTabParamList} from '../../navigation/RootBottomTabNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackNavigator';

type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;
const Profile = ({}: ProfileScreenProps) => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
