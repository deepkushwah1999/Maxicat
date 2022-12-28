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
import {apiWithTokenMultipart} from '../../Utils/api';
import Config from '../../Utils/Config';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import TextFormatted from '../../Components/TextFormated';
import {useState} from 'react';
import store from '../../redux/store';
import {THEME} from '../../redux/actionTypes';
import {useSelector, useDispatch} from 'react-redux';

import {launchImageLibrary} from 'react-native-image-picker';
import {useEffect} from 'react';

export default function UpdateUserInfo({navigation}) {
  const [selected, setSelected] = useState(1);

  // const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [about, setAbout] = useState('');
  const [themeing, setTheme] = useState(1);
  const Selected_theme = useSelector(state => state.auth.theme || 'Dark');
  // const user = useSelector(state => state.auth.user || null);
  const {user, token} = useSelector(state => {
    return {user: state.auth.user || null, token: state.auth.token || ''};
  });
  

  // useEffect(() => {
  //   setUsername(user?.name ? user.name : '');
  // }, [user]);
 const dispatch = useDispatch();
  useEffect(() => {
    if (user !== null) {
      setUsername(user?.name ? user.name : '');
      setAbout(user?.about ? user.about : 'Loading...');
    }
  }, [user]);

  const updateUser = async _user => {
    navigation.goBack();
    if (_user !== null) {
      let formData = new FormData();
      formData.append('name', username);
      formData.append('about', about);
      formData.append('password', '');
      
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
            Update User Info
          </TextFormated>
          <Text></Text>
          
        </View>
      </View>

      <TouchableOpacity
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
            <TextInput
              placeholder="Username"
              onChangeText={text => setUsername(text)}
              placeholderTextColor={theme.colors.Button}
              value={username}
              style={{
                fontSize: 12,
                padding: 2,
                color: theme.colors.Button,
                flex: 1,
              }}
            />
          </View>
          
        </View>
      </TouchableOpacity>
      <TouchableOpacity
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

            <TextInput
              placeholder="About"
              onChangeText={text => setAbout(text)}
              placeholderTextColor={theme.colors.Button}
              value={about}
              style={{
                fontSize: 12,
                padding: 2,
                color: theme.colors.Button,
                flex: 1,
              }}
            />
          </View>
          
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => updateUser()}
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
              Update Info
            </TextFormated>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
