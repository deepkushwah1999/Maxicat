import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import KeyboardButton from '../../Components/KeyboardButton';
import OneInputField from '../../Components/OneInputField';
import CustomButton from '../../Components/Button';
import React from 'react';
import { theme } from '../../Utils/theme';
import Button from '../../Components/Button';
import Statusbar from '../../Components/Statusbar';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../../Utils/api';
import Config from '../../Utils/Config';

function CodeEnter({ navigation, route }) {
  const [code, setCode] = useState('');
  const [currentSelected, setCurrentSelected] = useState(1);
  const [error, setError] = useState(null);
  const Selected_theme = useSelector(state => state.auth.theme || 'Dark');
  const dispatch = useDispatch()

  // alert(JSON.stringify(Selected_theme));

  const addCode = txt => {
    if (error) {
      setError(null);
    }
    setCode(c => {
      if (c.length == 4) {
        return c;
      }
      setCurrentSelected(c.length + 2);
      return c + txt;
    });
  };

  const removeCode = () => {
    if (error) {
      setError(null);
    }
    setCode(c => {
      if (code.length == 0) {
        return c;
      }
      setCurrentSelected(code.length);
      return c.substring(0, code.length - 1);
    });
  };

  const replaceAll = index => {
    setCode(c => {
      setCurrentSelected(index);
      return c.substring(0, index - 1);
    });
  };

  const submitPress = async () => {
    if(!code || code.length< 4){
      alert('Please enter your new pass code')
      return
    }


    let data = {
      phone: route?.params?.phone,
      password: code
    }
    let response = await api(Config.endpoints.setPassword, Config.type.post, data).catch(err => alert('signup error'))

    if(response.data!==null){
      dispatch({ type: 'LOGIN', payload: response.data })
    }else {
      alert('Try again')
    }
    
    // dispatch({ type: 'LOGIN', payload: {token: 'this is token xyz'} })

    //  navigation.navigate('Home')
  }

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
      <View
        style={{
          backgroundColor:
            Selected_theme == 'Dark'
              ? theme.colors.Background
              : theme.light_colors.Background,
          // flex: 1,
        }}>
        <View style={{ marginTop: 55, marginHorizontal: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color:
                Selected_theme == 'Dark'
                  ? theme.colors.White
                  : theme.light_colors.White,
              fontWeight: '700',
            }}>
            Enter the pascode
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginHorizontal: 100,
          }}>
          <OneInputField
            text={code.charAt(0)}
            selected={currentSelected == 1}
            onPress={() => replaceAll(1)}
            color={
              Selected_theme == 'Dark'
                ? theme.colors.White
                : theme.light_colors.White
            }
          />
          <OneInputField
            text={code.charAt(1)}
            selected={currentSelected == 2}
            onPress={() => replaceAll(2)}
            color={
              Selected_theme == 'Dark'
                ? theme.colors.White
                : theme.light_colors.White
            }
          />
          <OneInputField
            text={code.charAt(2)}
            selected={currentSelected == 3}
            onPress={() => replaceAll(3)}
            color={
              Selected_theme == 'Dark'
                ? theme.colors.White
                : theme.light_colors.White
            }
          />
          <OneInputField
            text={code.charAt(3)}
            selected={currentSelected == 4}
            onPress={() => replaceAll(4)}
            color={
              Selected_theme == 'Dark'
                ? theme.colors.White
                : theme.light_colors.White
            }
          />
        </View>
        {!!error && (
          <Text style={{ textAlign: 'center', marginTop: 20, color: 'red' }}>
            {error}
          </Text>
        )}
      </View>
      <View style={{ paddingTop: 50, marginHorizontal: 20 }}>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <KeyboardButton text="1" onPress={() => addCode(1)} />
          <KeyboardButton text="2" onPress={() => addCode(2)} />
          <KeyboardButton text="3" onPress={() => addCode(3)} />
        </View>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <KeyboardButton text="4" onPress={() => addCode(4)} />
          <KeyboardButton text="5" onPress={() => addCode(5)} />
          <KeyboardButton text="6" onPress={() => addCode(6)} />
        </View>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <KeyboardButton text="7" onPress={() => addCode(7)} />
          <KeyboardButton text="8" onPress={() => addCode(8)} />
          <KeyboardButton text="9" onPress={() => addCode(9)} />
        </View>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <KeyboardButton
            text=""
            onPress={() => { }}
            textStyle={{ fontSize: 15 }}
            backgroundColor={
              Selected_theme == 'Dark'
                ? theme.colors.Background
                : theme.light_colors.Background
            }
            borderColor={
              Selected_theme == 'Dark'
                ? theme.colors.Background
                : theme.light_colors.Background
            }
            borderWidth={0}
          />
          <KeyboardButton text="0" onPress={() => addCode(0)} />
          <KeyboardButton
            backgroundColor={theme.colors.Background}
            borderColor={theme.colors.Background}
            color={theme.colors.Button}
            fontSize={14}
            borderWidth={0}
            text="Cancel"
            onPress={() => removeCode()}
          />
        </View>
        <View style={{ height: 30 }} />
        <Button
          backgroundColor={theme.colors.Button}
          onPress={submitPress}
          ButtonText="Submit"
        />
        <View style={{ height: 30 }} />
      </View>
    </ScrollView>
  );
}

export default CodeEnter;
