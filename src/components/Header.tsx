import {Image, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {FC} from 'react';
import {SvgXml} from 'react-native-svg';
import {Bell_SVG} from '../constants/svg';

interface HeaderProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const Header: FC<HeaderProps> = ({containerStyle}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        source={require('../assets/images/avatar.png')}
        style={{width: 40, height: 40}}
      />

      <Image
        source={require('../assets/images/logo.png')}
        style={{width: 92.8, height: 16}}
      />

      <View
        style={{
          backgroundColor: '#f4f2f8',
          justifyContent: 'center',
          alignItems: 'center',
          width: 40,
          height: 40,
          borderRadius: 999,
        }}>
        <SvgXml xml={Bell_SVG} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    // borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderColor: 'green',
  },
});
