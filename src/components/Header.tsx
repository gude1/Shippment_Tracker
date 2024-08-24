import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {FC} from 'react';

interface HeaderProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const Header: FC<HeaderProps> = ({containerStyle}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text>Header</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'green',
    minHeight: 50,
  },
});
