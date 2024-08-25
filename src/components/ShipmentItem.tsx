import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import colors from '../constants/colors';
import {SvgXml} from 'react-native-svg';
import {
  ARROW_RIGHT_LEAN_SVG,
  ARROW_RIGHT_SVG,
  PACKAGE_SVG,
  PHONE_SVG,
  WHATSAPP_SVG,
} from '../constants/svg';
import Button from './Button';
import {useEffect, useRef, useState} from 'react';

interface ShipmentItemProps {
  style?: StyleProp<ViewStyle>;
  name: string;
  isChecked?: boolean;
  originState?: string;
  destinationState?: string;
  destinationCity?: string;
  originCity?: string;
  status?: 'Received' | 'Error' | 'Delivered' | 'Canceled' | 'on hold';
}

const ShipmentItem: React.FC<ShipmentItemProps> = ({
  style,
  name,
  originState,
  isChecked = false,
  originCity,
  destinationCity,
  destinationState,
  status = 'Received',
}) => {
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState(isChecked);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const toggleExpand = () => {
    const finalValue = expanded ? 0 : 1;
    setExpanded(!expanded);

    Animated.timing(animation, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 140], // Adjust height as needed
  });

  const paddingInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10], // Original padding value
  });

  const returnStatusTextStyle = () => {
    switch (status) {
      case 'Delivered':
        return {color: '#208D28'};
      case 'Error':
        return {color: '#D12030'};
      case 'on hold':
        return {color: '#DB7E21'};
      case 'Canceled':
        return {color: '#58536E'};
      default:
        return undefined;
    }
  };
  const returnStatusBgStyle = () => {
    switch (status) {
      case 'Delivered':
        return {backgroundColor: '#E3FAD6'};
      case 'Error':
        return {backgroundColor: '#FEE3D4'};
      case 'on hold':
        return {backgroundColor: '#FFF3D5'};
      case 'Canceled':
        return {backgroundColor: '#F4F2F8'};
      default:
        return undefined;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.sectionOne}>
        <BouncyCheckbox
          size={20}
          isChecked={checked}
          onPress={(check: boolean) => {
            setChecked(!checked);
          }}
          fillColor={'#D9E6FD'}
          unFillColor="white"
          iconImageStyle={{tintColor: colors.primary}}
          style={{width: 20, height: 20}}
          iconStyle={{borderRadius: 5}}
          innerIconStyle={{
            borderColor: checked ? '#6E91EC' : '#D0D5DD',
            borderRadius: 5,
          }}
          useNativeDriver
        />
        <SvgXml xml={PACKAGE_SVG} style={styles.package} />

        <View style={styles.textCtn}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            AWB
          </Text>
          <Text style={styles.shipcode} numberOfLines={1} ellipsizeMode="tail">
            {name}
          </Text>

          <View style={styles.tripCtn}>
            <Text
              style={styles.tripCtnOrigin}
              numberOfLines={1}
              ellipsizeMode="tail">
              {originCity || originState}
            </Text>
            <SvgXml xml={ARROW_RIGHT_SVG} style={{marginHorizontal: 2}} />
            <Text
              style={styles.tripCtnDes}
              numberOfLines={1}
              ellipsizeMode="tail">
              {destinationCity || destinationState}
            </Text>
          </View>
        </View>

        <View style={[styles.tripStatus, returnStatusBgStyle()]}>
          <Text
            style={[styles.tripStatusTxt, returnStatusTextStyle()]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {status}
          </Text>
        </View>

        <View
          style={[styles.expandIconCtn, expanded && styles.expandedIconCtn]}>
          <TouchableOpacity activeOpacity={0.8} onPress={toggleExpand}>
            <Image
              source={require('../assets/images/arrow-expand.png')}
              style={{
                width: 16,
                height: 16,
                tintColor: expanded ? 'white' : '#4561DB',
              }}
            />
          </TouchableOpacity>

          {/* <SvgFromXml
            xml={DIRECTION_SVG}
            onPress={toggleExpand}
            stroke={'white'}
          /> */}
        </View>
      </View>
      <Animated.View
        style={[
          styles.sectionTwo,
          {height: heightInterpolate, paddingVertical: paddingInterpolate},
        ]}>
        <View style={styles.tripDetailsCtn}>
          <View>
            <Text
              style={styles.tripDetailsTitle}
              numberOfLines={1}
              ellipsizeMode="tail">
              Origin
            </Text>
            <Text
              style={styles.tripDetailsOrigin}
              numberOfLines={1}
              ellipsizeMode="tail">
              {originCity || originState}
            </Text>
            <Text
              style={styles.tripDetailsAddress}
              numberOfLines={1}
              ellipsizeMode="tail">
              Dokki, 22 Nile St.
            </Text>
          </View>

          <SvgXml xml={ARROW_RIGHT_LEAN_SVG} />

          <View>
            <Text
              style={styles.tripDetailsTitle}
              numberOfLines={1}
              ellipsizeMode="tail">
              Destination
            </Text>
            <Text
              style={styles.tripDetailsOrigin}
              numberOfLines={1}
              ellipsizeMode="tail">
              {destinationCity || destinationState}
            </Text>
            <Text
              style={styles.tripDetailsAddress}
              numberOfLines={1}
              ellipsizeMode="tail">
              Smoha, 22 max St.
            </Text>
          </View>
        </View>
        <View style={styles.actionBtnCtn}>
          <Button
            title="Call"
            LeftIcon={<SvgXml xml={PHONE_SVG} />}
            style={styles.btnCall}
            containerStyle={styles.btnCallCtn}
          />
          <Button
            title="WhatsApp"
            LeftIcon={<SvgXml xml={WHATSAPP_SVG} />}
            style={styles.whatsappBtn}
            containerStyle={styles.whatsappBtnCtn}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default ShipmentItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionOne: {
    minHeight: 67,
    flexDirection: 'row',
    paddingLeft: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F4F2F8',
  },
  package: {
    marginLeft: 12,
  },
  textCtn: {
    marginLeft: 12,
  },
  name: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#3F395C',
    letterSpacing: 0,
  },
  shipcode: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'black',
    letterSpacing: 0,
  },
  tripCtn: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  tripCtnOrigin: {
    color: '#757281',
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    letterSpacing: 0,
  },
  tripCtnDes: {
    color: '#757281',
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    letterSpacing: 0,
  },
  tripStatus: {
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#D9E6FD',
    borderRadius: 5,
    marginLeft: 8,
    paddingHorizontal: 6,
  },
  tripStatusTxt: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    letterSpacing: 0,
    textTransform: 'uppercase',
    color: colors.primary,
  },
  expandIconCtn: {
    justifyContent: 'center',
    width: 24,
    height: 24,
    marginLeft: 15,
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
  },
  expandedIconCtn: {
    backgroundColor: '#6E91EC',
    borderWidth: 2,
    borderColor: '#D0D5DD',
  },
  expandIcon: {},
  sectionTwo: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 40,
    backgroundColor: 'rgba(244, 242, 248, 0.5)',
  },
  tripDetailsCtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tripDetailsTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    letterSpacing: 0,
    color: colors.primary,
  },
  tripDetailsOrigin: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'black',
    letterSpacing: 0,
  },
  tripDetailsAddress: {
    fontFamily: 'Inter-Light',
    fontSize: 13,
    color: '#58536E',
  },
  actionBtnCtn: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'flex-end',
  },
  btnCallCtn: {
    width: 100,
  },
  btnCall: {
    height: 40,
    backgroundColor: '#6E91EC',
  },
  whatsappBtnCtn: {
    width: 142,
    marginLeft: 28,
  },
  whatsappBtn: {
    backgroundColor: '#25D366',
    height: 40,
  },
});
