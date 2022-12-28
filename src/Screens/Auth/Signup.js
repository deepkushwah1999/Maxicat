import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';

import StepIndicator from 'react-native-step-indicator';
import Button from '../../Components/Button';
import TextFormatted from '../../Components/TextFormated';
import Statusbar from '../../Components/Statusbar';
import { theme } from '../../Utils/theme';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useSelector } from 'react-redux';
import { api } from '../../Utils/api';
import Config from '../../Utils/Config';
import { Loader } from '../../Components/Loader';
// import Api from '../../services/api';

const labels = [
  'Phone code',
  'Phone number',
  'Personal information',
  'OTP (Verification)',
];
export default function Home({ navigation }) {
  const [currentPossition, setCurrentPossition] = useState(0);
  const [countryCode, setCountryCode] = useState('US');
  const [country, setCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null);
  const [otpCode, setOtpCode] = useState(null);
  const [withFlag, setWithFlag] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const Selected_theme = useSelector(state => state.auth.theme || 'Dark');

  // alert(JSON.stringify(Selected_theme));

  const [withCallingCode, setWithCallingCode] = useState(true);
  const [callingCode, setCallingCode] = useState('1');
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setCurrentPossition(1);
    setCallingCode(country.callingCode);
  };

  // alert(JSON.string(country));
  // console.log(country?.callingCode);
  // console.log(countryCode);

  const nextPress = async () => {
    if (!callingCode && !callingCode[0]) {
      alert('Select Country code')
      return
    }
    if (phoneNumber === '') {
      alert('Enter phone number')
      return
    }
    if (username === '') {
      alert('Enter your username')
      return
    }
    const phone = '+' + callingCode[0] + phoneNumber
    if (userId === null) {
      let data = {
        phone: phone,
        name: username
      }
      let response = await api(Config.endpoints.register, Config.type.post, data, setIsLoading).catch(err => alert('signup error', JSON.stringify(err)))
      if (response.data) {
        alert('OTP has been send to the phone number. please enter in below field and press next.' + response.data.otpCo)
        setUserId(response.data.userId)
      } else if (response.message) {
        alert(response.message)
      }
    } else {
      if (otpCode === '') {
        alert('Enter your otp code')
        return
      }
      let data = {
        userId: userId,
        otp: otpCode
      }
      let response = await api(Config.endpoints.verify, Config.type.post, data, setIsLoading).catch(err => alert('signup error', JSON.stringify(err)))
      console.log('response--->', response)
      if (response.data) {
        navigation.navigate('Setpassword', { phone: phone })
      } else if (response.data == null) {
        alert('Invalid otp code please try again')

      }
    }




    // navigation.navigate('Setpassword')
  };

  const [show, setShow] = useState(false);
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor:
          Selected_theme == 'Dark'
            ? theme.colors.Background
            : theme.light_colors.Background,
      }}>
      <Statusbar
        backgroundColor={theme.colors.Background}
        barStyle="light-content"
      />
      <View style={{ alignItems: 'center' }}>
        <Image
          style={{
            height: Dimensions.get('window').width / 4,
            width: Dimensions.get('window').width / 2,
            resizeMode: 'cover',
            marginVertical: 20,
          }}
          source={require('../../assets/logo_icon.png')}
        />
        <TextFormatted style={{ fontWeight: '700', color: theme.colors.Button }}>
          Please enter you country code for creating account
        </TextFormatted>
      </View>
      <View style={{ maxHeight: 300, height: 280, marginHorizontal: 20 }}>
        <StepIndicator
          customStyles={{
            stepIndicatorSize: 25,
            currentStepIndicatorSize: 25,
            separatorStrokeWidth: 2,
            currentStepStrokeWidth: 5,
            stepStrokeCurrentColor:
              Selected_theme == 'Dark'
                ? theme.colors.White
                : theme.light_colors.White,
            stepStrokeWidth: 2,
            stepStrokeFinishedColor:
              Selected_theme == 'Dark'
                ? theme.colors.White
                : theme.light_colors.White,
            stepStrokeUnFinishedColor:
              Selected_theme == 'Dark'
                ? theme.colors.White
                : theme.light_colors.White,
            separatorFinishedColor:
              Selected_theme == 'Dark'
                ? theme.colors.White
                : theme.light_colors.White,
            separatorUnFinishedColor: '#aaaaaa',
            stepIndicatorFinishedColor: theme.colors.Background,
            stepIndicatorUnFinishedColor: theme.colors.Background,
            stepIndicatorCurrentColor: theme.colors.Background,
            stepIndicatorLabelFontSize: 13,
            currentStepIndicatorLabelFontSize: 13,
            // stepIndicatorLabelCurrentColor: 'red',
            stepIndicatorLabelFinishedColor: theme.colors.Background,
            stepIndicatorLabelUnFinishedColor: theme.colors.Background,
            // labelColor: 'red',
            labelSize: 13,
            currentStepLabelColor: theme.colors.Background,
            labelAlign: 'flex-start',
          }}
          currentPosition={currentPossition}
          labels={labels}
          stepCount="4"
          direction={'vertical'}
          renderLabel={({ position, stepStatus, label, currentPosition }) => {
            return (
              <View>
                <TextFormatted
                  style={{
                    fontWeight: '700',
                    color:
                      Selected_theme == 'Dark'
                        ? theme.colors.White
                        : theme.light_colors.White,
                    alignSelf: 'flex-start',
                    // textAlign: 'left',
                  }}>
                  {label}
                </TextFormatted>
                <View
                  style={{
                    position: 'absolute',
                    top: 25,
                    // backgroundColor: 'red',
                  }}>
                  {position == 0 && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <CountryPicker
                        {...{
                          countryCode,
                          onSelect,
                          withFlag,
                          withCallingCode,
                        }}
                        theme={DARK_THEME}
                        withModal
                        style={{}}
                        withCallingCode={true}
                      // defaultCode
                      />
                      <TextFormatted
                        style={{
                          fontWeight: '500',
                          color:
                            Selected_theme == 'Dark'
                              ? theme.colors.White
                              : theme.light_colors.White,
                          marginTop: 5,
                        }}>
                        (+{callingCode})
                      </TextFormatted>
                    </View>
                  )}
                  {position == 1 && (
                    <View
                      style={{
                        backgroundColor: theme.colors.inputbg,
                        paddingHorizontal: 10,
                        width: Dimensions.get('window').width / 2,
                        borderRadius: 5,
                        borderWidth: 1,
                      }}>
                      <TextInput
                        placeholder="Phone Number"
                        placeholderTextColor={theme.colors.Button}
                        onChangeText={(text) => { setPhoneNumber(text), setUserId(null) }}
                        style={{
                          fontSize: 12,
                          padding: 6,
                          color: theme.colors.Button,
                          flex: 1,
                        }}
                        keyboardType="number-pad"
                        onSubmitEditing={() => setCurrentPossition(2)}
                      />
                    </View>
                  )}
                  {position == 2 && (
                    <View
                      style={{
                        backgroundColor: theme.colors.inputbg,
                        paddingHorizontal: 10,
                        width: Dimensions.get('window').width / 2,
                        // padding: 7,
                        borderRadius: 5,
                      }}>
                      <TextInput
                        placeholder="User name"
                        placeholderTextColor={theme.colors.Button}
                        onChangeText={(text) => { setUsername(text), setUserId(null) }}
                        style={{
                          fontSize: 12,
                          padding: 6,
                          color: theme.colors.Button,
                          flex: 1,
                        }}
                        onSubmitEditing={() => setCurrentPossition(3)}
                      />
                    </View>
                  )}
                  {position == 3 && (
                    <OTPInputView
                      style={{ height: 50, borderColor: theme.colors.Background }}
                      pinCount={4}
                      // autoFocusOnLoad
                      codeInputFieldStyle={[
                        styles.underlineStyleBase,
                        {
                          color:
                            Selected_theme == 'Dark'
                              ? theme.colors.White
                              : theme.light_colors.White,
                        },
                      ]}
                      codeInputHighlightStyle={{
                        borderColor:
                          Selected_theme == 'Dark'
                            ? theme.colors.White
                            : theme.light_colors.White,
                      }}
                      onCodeFilled={code => {
                        setOtpCode(code)
                      }}
                    />
                  )}
                </View>
              </View>
            );
          }}
        />
      </View>
      <View style={{ height: 50 }} />
      <Button
        backgroundColor={theme.colors.Button}
        onPress={() => nextPress()}
        ButtonText="Next"
      />
      <View style={{ height: 15 }} />
      <TextFormatted
        style={{
          color: theme.colors.Button,
          alignSelf: 'center',
        }}>
        Already have an account?{' '}
        <TextFormatted
          onPress={() => navigation.navigate('Login')}
          style={{ fontWeight: '700', color: theme.colors.Button }}>
          Login
        </TextFormatted>
      </TextFormatted>
      <Loader loading={isLoading}></Loader>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 25,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1.8,
    borderColor: theme.colors.Background,

    // marginTop: 65,
    // fontSize: 20,
  },

  underlineStyleHighLighted: {},
});
