import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {theme} from '../Utils/theme';
import TextFormatted from './TextFormated';
// alert(JSON.stringify(Selected_theme));

export default function Header({
  source,
  onPress,
  Headertext,
  sourcetwo,
  onPressTwo,
  backgroundColor,
  sourcethree,
  skippress,
  textcolor,
  sourcetwoH,
  width,
  height,
}) {
  const Selected_theme = useSelector(state => state.auth.theme || 'Dark');
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: backgroundColor,
        paddingVertical: 13,
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={{
            height: height || 22,
            width: width || 22,
            resizeMode: 'contain',
          }}
          source={source}
          // source={require('../Assets/Backwhite.png')}
        />
      </TouchableOpacity>
      <TextFormatted
        style={{
          color: textcolor || theme.colors.Black,
          fontSize: 20,
          fontWeight: '700',
          textAlign: 'center',
          paddingHorizontal: 20,
        }}>
        {Headertext}
      </TextFormatted>

      <TouchableOpacity onPress={onPressTwo}>
        <Image
          style={{
            height: 30,
            width: 30,
            resizeMode: 'cover',
            borderRadius: 20,
          }}
          source={sourcetwo}
        />
      </TouchableOpacity>
      {!!sourcethree && (
        <TouchableOpacity onPress={skippress}>
          <Image
            style={{
              height: 20,
              width: 30,
              resizeMode: 'contain',
              borderWidth: 1,
            }}
            source={sourcethree}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
