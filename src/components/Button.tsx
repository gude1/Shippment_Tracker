import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {FC} from 'react';
import colors from '../constants/colors';

interface ButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loadng?: boolean;
  LeftIcon?: React.ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  title?: string;
}

const Button: FC<ButtonProps> = ({
  onPress,
  title = 'Button',
  style,
  disabled = false,
  loadng = false,
  containerStyle,
  LeftIcon,
  titleStyle,
}) => {
  const renderContent = () => {
    if (loadng) {
      return <ActivityIndicator size={'small'} color={colors.primary} />;
    }

    return (
      <>
        {LeftIcon}
        <Text
          style={[styles.title, disabled && styles.disabledBtnTxt, titleStyle]}>
          {title}
        </Text>
      </>
    );
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.btnCtn, containerStyle]}>
      <View style={[styles.button, disabled && styles.disabledBtn, style]}>
        {renderContent()}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnCtn: {
    width: '90%',
    maxWidth: 361,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  title: {
    fontFamily: 'SF-Pro-Text-Bold',
    color: 'white',
    fontSize: 17,
    marginLeft: 8,
    letterSpacing: -0.14,
  },
  disabledBtn: {
    backgroundColor: '#EAE7F2',
  },
  disabledBtnTxt: {
    color: '#A7A3B3',
  },
});
