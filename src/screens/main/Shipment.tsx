import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../navigation/RootStackNavigator';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootBottomTabParamList} from '../../navigation/RootBottomTabNavigator';
import Header from '../../components/Header';

type ShipmentScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, 'Shipment'>,
  NativeStackScreenProps<RootStackParamList>
>;

const Shipment = ({}: ShipmentScreenProps) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <View style={styles.container}>
        <Text>Shipment</Text>
      </View>
    </SafeAreaView>
  );
};

export default Shipment;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    maxWidth: 800,
    borderWidth: 2,
    borderColor: 'red',
  },
});
