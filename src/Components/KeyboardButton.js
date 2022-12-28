import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {theme} from '../Utils/theme';
// alert(JSON.stringify(Selected_theme));

function KeyboardButton({
  text,
  backspace = false,
  backgroundColor,
  onPress,
  textStyle = {},
  opacity,
  color,
  fontSize,
  borderColor,
}) {
  const Selected_theme = useSelector(state => state.auth.theme || 'Dark');
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: 100,
        backgroundColor: backgroundColor || theme.colors.Background,
        alignItems: 'center',
        justifyContent: 'center',
        width: (Dimensions.get('window').width - 80) / 4,
        height: (Dimensions.get('window').width - 80) / 4,
        opacity: opacity,
        borderWidth: 2,
        borderColor: borderColor || theme.colors.list_bg,
      }}>
      {backspace ? (
        <MaterialCommunityIcons
          name="backspace-outline"
          size={20}
          color="black"
        />
      ) : (
        <Text
          style={{
            fontSize: fontSize || 20,
            color: color || theme.colors.White,
            ...textStyle,
          }}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default KeyboardButton;
