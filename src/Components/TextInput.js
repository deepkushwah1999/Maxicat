import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {theme} from '../Utils/theme';
import TextFormatted from './TextFormated';
// alert(JSON.stringify(Selected_theme));

export default function CustomTextInput({
  placeholder,
  Heading,
  onChangeText,
  value,
  nulll,
  editable,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  onSubmitEditing,
  HideOnPress,
  Hide,
  opacitytwo,
  searchbar,
  search,
  multiline,
  height,
  borderRadius,
  marginTop,
}) {
  const Selected_theme = useSelector(state => state.auth.theme || 'Dark');
  return (
    <View>
      {!!Heading && (
        <TextFormatted style={styles.heading}>{Heading}</TextFormatted>
      )}

      <View
        style={{
          backgroundColor: '#F7F8F8',
          paddingHorizontal: 15,
          borderRadius: 10,
          marginTop: 10,
          opacity: opacitytwo,
          width: Dimensions.get('window').width - 60,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {!!searchbar && (
            <Image
              style={{
                height: 22,
                width: 22,
                resizeMode: 'contain',
                // marginRight: 7,
              }}
              source={searchbar}
            />
          )}
          <TextInput
            editable={editable}
            style={[
              styles.textInput,
              {
                height: height,
                marginTop: marginTop,
                color:
                  Selected_theme == 'Dark'
                    ? theme.colors.Black
                    : theme.light_colors.White,
              },
            ]}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.placeholder}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            multiline={multiline}
          />
          {!!Hide && (
            <TouchableOpacity
              // style={{flexDirection: 'row'}}
              onPress={HideOnPress}>
              <Image
                style={{
                  height: 22,
                  width: 22,
                  resizeMode: 'contain',
                }}
                source={Hide}
              />
            </TouchableOpacity>
          )}
        </View>
        {!!search && (
          <Image
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
            }}
            // source={require('../Assets/icons/Searc.png')}
          />
        )}

        {!!nulll && <View />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontWeight: '500',
    fontSize: 16,
    paddingVertical: 15,

    flex: 1,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 14,
    // marginHorizontal: 30,
    marginTop: 20,
    color: theme.colors.placeholder,
    fontWeight: '500',
  },
  error: {
    color: '#900',
    textDecorationLine: 'underline',
    marginHorizontal: 20,
  },
  optional: {
    fontSize: 14,
    // marginHorizontal: 30,
    // marginTop: 20,
    color: theme.colors.placeholder,
    fontWeight: '700',
  },
});
