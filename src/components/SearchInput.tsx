import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {CANCEL_SVG, SEARCH_SVG} from '../constants/svg';

interface SearchInputProps {
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  onChangeText?: ((text: string) => void) | undefined;
  value?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search',
  onChangeText,
  value,
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderWidthAnim = useRef(new Animated.Value(0)).current;
  const borderColorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderWidthAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(borderColorAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isFocused, borderWidthAnim, borderColorAnim]);

  const borderColorInterpolation = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#6E91EC'],
  });

  const clearText = () => {
    onChangeText && onChangeText('');
  };

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          borderWidth: borderWidthAnim,
          borderColor: borderColorInterpolation,
        },
      ]}>
      <SvgXml xml={SEARCH_SVG} style={{alignSelf: 'center'}} />
      <TextInput
        value={value}
        autoFocus={false}
        keyboardType="web-search"
        placeholderTextColor={'#A7A3B3'}
        onChangeText={onChangeText}
        style={styles.textInput}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {value && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={clearText}
          style={{alignSelf: 'center'}}>
          <SvgXml xml={CANCEL_SVG} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F4F2F8',
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 14,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 361,
  },
  textInput: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 8,
    letterSpacing: 0,
    flex: 1,
  },
});
