import React from 'react';
import {useEffect, useState} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {useSelector} from 'react-redux';
import {theme} from '../Utils/theme';
// alert(JSON.stringify(Selected_theme));

function OneInputField({
  selected,
  text,
  onPress,
  borderWidth,
  borderColor,
  color,
}) {
  const [blinkVisible, setBlinkVisible] = useState(false);
  const Selected_theme = useSelector(state => state.auth.theme || 'Dark');

  useEffect(() => {
    setBlinkVisible(true);
    const int =
      selected &&
      setInterval(() => {
        setBlinkVisible(v => !v);
      }, 750);
    return () => selected && clearInterval(int);
  }, [selected]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{paddingBottom: 5, borderRadius: 10}}>
        <View
          style={{
            borderRadius: 150,
            backgroundColor: text ? color : 'transparent',
            borderWidth: borderWidth || 1,
            borderColor: text ? '#fff' : theme.colors.list_bg,
            // paddingVertical: 1,
            // paddingHorizontal: 6,
            alignItems: 'center',
            justifyContent: 'center',
            width: 15,
            height: 15,
          }}>
          <Text
            style={{
              fontSize: 12,
              color: 'transparent',
            }}>
            {text}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default OneInputField;
