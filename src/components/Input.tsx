import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  TextInputProps,
  TextStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
import colors from '../constants/colors';

interface AnimatedTextInputProps extends TextInputProps {
  label: string;
  value: string;
  style?: StyleProp<ViewStyle>;
  onChangeText: (text: string) => void;
}

const Input: React.FC<AnimatedTextInputProps> = ({
  label,
  value,
  style,
  onChangeText,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useState(
    new Animated.Value(value === '' ? 0 : 1),
  )[0];

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle: Animated.WithAnimatedObject<TextStyle> = {
    position: 'absolute',
    left: 10,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [25, 8], // Adjust the top position for the focused state
    }) as Animated.AnimatedInterpolation<number>,
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 11],
    }) as Animated.AnimatedInterpolation<number>,
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#A7A3B3', '#58536E'],
    }) as Animated.AnimatedInterpolation<string>,
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.input}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: '#f7f7fb',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    height: 56,
    fontSize: 16,
    marginTop: 5,
    color: colors.primary,
    paddingHorizontal: 0,
  },
});

export default Input;
