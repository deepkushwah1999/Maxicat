import {
  View,
  Text,
  Dimensions,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React from 'react';
import TextFormated from '../../Components/TextFormated';
import Statusbar from '../../Components/Statusbar';
import {theme} from '../../Utils/theme';
import Feather from 'react-native-vector-icons/dist/Feather';
import { apiWithTokenMultipart } from '../../Utils/api';
import Config from '../../Utils/Config';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import TextFormatted from '../../Components/TextFormated';
import {useState} from 'react';
import store from '../../redux/store';
import {THEME} from '../../redux/actionTypes';
import {useSelector, useDispatch} from 'react-redux';

import {launchImageLibrary} from 'react-native-image-picker';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import { Alert } from 'react-native';



export default function ChangePassword({navigation}) {
  const [selected, setSelected] = useState(1);
  const [userImage, setUserImage] = useState('');
  const [themeing, setTheme] = useState(1);
const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [conformPassword, setConformPassword] = useState('')
  const Selected_theme = useSelector(state => state.auth.theme || 'Dark');
   const {user, token} = useSelector(state => {
    return {user: state.auth.user || null, token: state.auth.token || ''};
  });
  const dispatch = useDispatch();
const [hidePass, setHidePass] = useState(true);
  let oldpassword = "1234"
function handleClick(){
 
  if (newPassword !== conformPassword ) {
    
    Alert.alert("Password is not conformed")
  }
  if (newPassword === conformPassword && currentPassword !== oldpassword) {
   
    Alert.alert("current Password is not currect")
  }
  if (newPassword === conformPassword && currentPassword === "1234") {
    
    Alert.alert("Password is changed")
    updateUser()
  }
  
}
const updateUser = async _user => {
    if (_user !== null) {
      let formData = new FormData();
      formData.append('password', newPassword);
      
      let response = await apiWithTokenMultipart(
        Config.endpoints.updateUser,
        Config.type.post,
        formData,
        token,
        // setIsLoading,
      ).catch(err => console.log('error'));
      if (response.data !== null && response.data.user) {
        dispatch({type: 'UPDATE', payload: response.data.user});
      }
    }
  };

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
          shadowColor:
            Selected_theme == 'Dark'
              ? theme.colors.Light_Gray
              : theme.colors.Background,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 1.84,

          elevation: 4,
          paddingBottom: 30,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}>
        <View
          style={{
            marginHorizontal: 30,
            marginTop: 25,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather
              name="chevron-left"
              size={24}
              color={theme.colors.Light_Gray}
            />
          </TouchableOpacity>
          <TextFormated
            style={{
              fontWeight: 'bold',
              color:
                Selected_theme == 'Dark'
                  ? theme.colors.White
                  : theme.light_colors.White,
            }}>
            Change Password
          </TextFormated>
          <Text></Text>
        </View>
      </View>
      <TextInput
        placeholder="Current Password"
        secureTextEntry={true}
       placeholderTextColor= {Selected_theme == 'Dark'
              ? "white"
              : "gray"}
        editable={true}
        value={currentPassword}
        onChangeText={text=>setCurrentPassword(text)}
        style={{
          marginVertical: 8,
          color: Selected_theme == 'Dark'
              ? "white"
              : "gray",
          backgroundColor:
            Selected_theme == 'Dark'
              ? theme.colors.Background
              : theme.light_colors.Background,
          paddingVertical: 8,
          paddingHorizontal: 15,
          marginHorizontal: 20,
          borderRadius: 10,
          borderColor: theme.colors.list_bg,
          borderWidth: 1,
          borderColor: theme.colors.Button,
          marginTop: 10,
        }}></TextInput>
      <TextInput
        placeholder="New Password"
        placeholderTextColor= {Selected_theme == 'Dark'
              ? "white"
              : "gray"}
        secureTextEntry={true}
        editable={true}
        value={newPassword}
        onChangeText={text=>setNewPassword(text)}
        style={{
          marginVertical: 8,
          color: Selected_theme == 'Dark'
              ? "white"
              : "gray",
          backgroundColor:
            Selected_theme == 'Dark'
              ? theme.colors.Background
              : theme.light_colors.Background,
          paddingVertical: 8,
          paddingHorizontal: 15,
          marginHorizontal: 20,
          borderRadius: 10,
          borderColor: theme.colors.list_bg,
          borderWidth: 1,
          borderColor: theme.colors.Button,
          marginTop: 10,
        }}></TextInput>
      <TextInput
        placeholder="Conform Password"
        value={conformPassword}
        onChangeText={text=>setConformPassword(text)}
        secureTextEntry={true}
        placeholderTextColor= {Selected_theme == 'Dark'
              ? "white"
              : "gray"}

        style={{
          marginVertical: 8,
          color: Selected_theme == 'Dark'
              ? "white"
              : "gray",
          backgroundColor:
            Selected_theme == 'Dark'
              ? theme.colors.Background
              : theme.light_colors.Background,
          paddingVertical: 8,
          paddingHorizontal: 15,
          marginHorizontal: 20,
          borderRadius: 10,
          borderColor: theme.colors.list_bg,
          borderWidth: 1,
          borderColor: theme.colors.Button,
          marginTop: 10,
        }}></TextInput>

      <TouchableOpacity
        onPress={() => handleClick()}
        style={{
          marginVertical: 8,
          backgroundColor:
            Selected_theme == 'Dark'
              ? theme.colors.Background
              : theme.light_colors.Background,
          paddingVertical: 12,
          paddingHorizontal: 15,
          marginHorizontal: 20,
          borderRadius: 10,
          borderColor: theme.colors.list_bg,
          borderWidth: 1,
          borderColor: theme.colors.Button,
          marginTop: 10,
        }}
      >
        <View style={{}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: Dimensions.get('window').width - 75,
              justifyContent: 'center',
            }}>
            <TextFormated
              style={{
                fontWeight: '700',
                color:
                  Selected_theme == 'Dark'
                    ? theme.colors.Light_Gray
                    : theme.light_colors.Light_Gray,
              }}>
              Update PassWord
            </TextFormated>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
