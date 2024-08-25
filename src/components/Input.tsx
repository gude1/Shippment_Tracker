import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  TextInputProps,
  TextStyle,
} from 'react-native';

interface AnimatedTextInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

const Input: React.FC<AnimatedTextInputProps> = ({
  label,
  value,
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
      outputRange: [20, 0],
    }) as Animated.AnimatedInterpolation<number>,
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }) as Animated.AnimatedInterpolation<number>,
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000'],
    }) as Animated.AnimatedInterpolation<string>,
  };

  return (
    <View style={styles.container}>
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
    paddingTop: 20,
    marginBottom: 10,
    backgroundColor: '#f7f7fb',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 0,
  },
});

export default Input;
