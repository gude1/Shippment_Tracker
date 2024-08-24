import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../navigation/RootStackNavigator';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootBottomTabParamList} from '../../navigation/RootBottomTabNavigator';
import Header from '../../components/Header';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import colors from '../../constants/colors';
import ShipmentItem from '../../components/ShipmentItem';
import Button from '../../components/Button';
import {SvgXml} from 'react-native-svg';
import {FILTER_SVG, SCAN_SVG} from '../../constants/svg';

type ShipmentScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, 'Shipment'>,
  NativeStackScreenProps<RootStackParamList>
>;

const Shipment = ({navigation, route}: ShipmentScreenProps) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.welcomeTxt}>Hello,</Text>
        <Text style={styles.userName}>Ibrahim Shaker</Text>

        <View style={styles.input}></View>

        <View style={styles.btnCtn}>
          <Button
            title="Filters"
            LeftIcon={<SvgXml xml={FILTER_SVG} />}
            titleStyle={[styles.actionBtnTxt, {color: '#58536E'}]}
            containerStyle={{flex: 1, maxWidth: 173.5}}
            style={{height: 44, backgroundColor: '#F4F2F8'}}
          />
          <Button
            title="Add Scan"
            titleStyle={styles.actionBtnTxt}
            LeftIcon={<SvgXml xml={SCAN_SVG} />}
            containerStyle={{flex: 1, maxWidth: 173.5, marginLeft: 14}}
            style={{height: 44}}
          />
        </View>

        <View style={styles.listTitleCtn}>
          <Text style={styles.listTitle}>Shipments</Text>

          <View style={styles.listCheckCtn}>
            <BouncyCheckbox
              size={20}
              fillColor={'#D9E6FD'}
              unFillColor="transparent"
              iconImageStyle={{tintColor: colors.primary}}
              style={{width: 20, height: 20}}
              iconStyle={{borderRadius: 5}}
              innerIconStyle={{borderColor: '#D0D5DD', borderRadius: 5}}
              useNativeDriver
            />
            <Text style={styles.listCheckActionText}>Mark All</Text>
          </View>
        </View>

        <ShipmentItem style={{marginTop: 8}} />
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  welcomeTxt: {
    fontFamily: 'Inter-Regular',
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    letterSpacing: 0,
  },
  userName: {
    marginTop: 12,
    fontFamily: 'SF-Pro-Display-Semibold',
    color: 'black',
    fontSize: 28,
    letterSpacing: 0,
  },
  input: {
    width: '100%',
    height: 44,
    marginTop: 24,
    borderRadius: 10,
    maxWidth: 361,
    backgroundColor: '#f4f2f8',
  },
  btnCtn: {
    marginTop: 24,
    width: '100%',
    flexDirection: 'row',
    maxWidth: 361,
  },
  actionBtnTxt: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    letterSpacing: 0,
  },
  listTitleCtn: {
    marginTop: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listTitle: {
    marginRight: 8,
    fontFamily: 'SF-Pro-Display-Semibold',
    color: 'black',
    fontSize: 22,
    letterSpacing: 0,
  },
  listCheckCtn: {
    flexDirection: 'row',
    // borderWidth: 2,
    // borderColor: 'green',
    alignItems: 'center',
  },
  listCheckActionText: {
    color: colors.primary,
    fontSize: 18,
    marginLeft: 8,
    fontFamily: 'SF-Pro-Display-Regular',
  },
});
