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
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { theme } from '../../Utils/theme';
import { useSelector, useDispatch } from 'react-redux';
import Config from '../../Utils/Config';
import { api } from '../../Utils/api';

const labels = ['Phone number', 'OTP (Verification)'];
export default function Login({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPossition, setCurrentPossition] = useState(0);
  const [countryCode, setCountryCode] = useState('FR');
  const [country, setCountry] = useState(null);
  const [withFlag, setWithFlag] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [userId, setUserId] = useState(null);
  const Selected_theme = useSelector(state => state.auth.theme || 'Dark');
  const dispatch = useDispatch()



  const nextPress = async () => {

    if (phoneNumber === '') {
      alert('Enter phone number')
      return
    }

    if (userId === null) {
      let data = {
        phone: phoneNumber
      }
      let response = await api(Config.endpoints.loginWithPhone, Config.type.post, data, setIsLoading).catch(err => alert('login error '))
      if (response.data) {
        setUserId(response.data.userId)
        alert('OTP has been send to the phone number. please enter the code below.' + response.data.otpCo)
      } else if (response.message) {
        alert(response.message)
      }
    } else {
      if (code === '') {
        alert('Enter your otp code')
        return
      }
      let data = {
        userId: userId,
        otp: code
      }
      let response = await api(Config.endpoints.verify, Config.type.post, data, setIsLoading).catch(err => alert('signup error'))
      if (response.data) {
        navigation.navigate('EnterPassword', { phone: phoneNumber })
      } else if (response.message) {
        alert(response.message)

      }



    }




    // navigation.navigate('EnterPassword')
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
      <View style={{ maxHeight: 300, height: 200, marginHorizontal: 20 }}>
        <StepIndicator
          customStyles={{
            stepIndicatorSize: 25,
            currentStepIndicatorSize: 25,
            separatorStrokeWidth: 2,
            currentStepStrokeWidth: 5,
            stepStrokeCurrentColor: '#fff',
            stepStrokeWidth: 2,
            stepStrokeFinishedColor:
              Selected_theme == 'Dark'
                ? theme.colors.White
                : theme.light_colors.White,
            stepStrokeUnFinishedColor:
              Selected_theme == 'Dark'
                ? theme.colors.White
                : theme.light_colors.White,
            separatorFinishedColor: '#fff',
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
          stepCount="2"
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
                <View style={{ position: 'absolute', bottom: -50 }}>
                  {position == 0 && (
                    <View
                      style={{
                        backgroundColor: theme.colors.inputbg,
                        // paddingVertical: 10,
                        paddingHorizontal: 10,
                        width: Dimensions.get('window').width / 2,
                        // height: 40,
                        borderRadius: 5,
                        // padding: 7,
                      }}>
                      <TextInput
                        placeholder="Phone Number"
                        onChangeText={(text) => { setPhoneNumber(text), setUserId(null) }}
                        placeholderTextColor={theme.colors.Button}
                        style={{
                          fontSize: 12,
                          padding: 9,
                          color: theme.colors.Button,
                          flex: 1,
                        }}
                        keyboardType="phone-pad"
                        onSubmitEditing={() => setCurrentPossition(2)}
                      />
                    </View>
                  )}

                  {position == 1 && (
                    <OTPInputView
                      style={{ height: 50, borderColor: '#fff' }}
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
                        setCode(code)
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
        onPress={nextPress}
        ButtonText="Next"
      />
      <View style={{ height: 15 }} />
      <TextFormatted
        style={{
          color: theme.colors.Button,
          alignSelf: 'center',
        }}>
        Don't have an account?{' '}
        <TextFormatted
          onPress={() => navigation.goBack()}
          style={{ fontWeight: '700', color: theme.colors.Button }}>
          Sign up
        </TextFormatted>
      </TextFormatted>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 25,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1.8,
    borderColor: theme.colors.MyChatBg,

    // marginTop: 65,
    // fontSize: 20,
  },

  underlineStyleHighLighted: {},
});
