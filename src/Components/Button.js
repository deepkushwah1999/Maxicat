import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {theme} from '../Utils/theme';
import TextFormatted from './TextFormated';
// alert(JSON.stringify(Selected_theme));

export default function Button({
  borderRadius,
  ButtonText,
  onPress,
  loading,
  source,
  paddingHorizontal,
  sourceTwo,
  backgroundColor,
  marginTop,
}) {
  const Selected_theme = useSelector(state => state.auth.theme || 'Dark');
  return (
    <TouchableOpacity
      style={{
        marginTop: marginTop,

        borderRadius: borderRadius || 50,
        marginHorizontal: 20,
        // paddingVertical: paddingVertical || 20,
        paddingHorizontal: paddingHorizontal,
        backgroundColor: backgroundColor,
        shadowColor:
          Selected_theme == 'Dark'
            ? theme.colors.White
            : theme.light_colors.White,
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
      }}
      onPress={loading ? null : onPress}>
      <TextFormatted style={styles.buttonText}>{ButtonText}</TextFormatted>
    </TouchableOpacity>
  );
}

var styles = StyleSheet.create({
  linearGradient: {
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 5,
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontWeight: '700',
    paddingVertical: 12,
    // borderWidth: 1,
  },
});
