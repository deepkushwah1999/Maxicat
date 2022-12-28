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
import React, {useEffect} from 'react';
import TextFormated from '../../Components/TextFormated';
import Statusbar from '../../Components/Statusbar';
import {theme} from '../../Utils/theme';
import Feather from 'react-native-vector-icons/dist/Feather';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import TextFormatted from '../../Components/TextFormated';
import {useState} from 'react';
import store from '../../redux/store';
import {THEME} from '../../redux/actionTypes';
import {useSelector, useDispatch} from 'react-redux';

import {launchImageLibrary} from 'react-native-image-picker';
import {apiWithToken, apiWithTokenMultipart} from '../../Utils/api';
import Config from '../../Utils/Config';
import {Loader} from '../../Components/Loader';

export default function Home({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(1);
  const [userImage, setUserImage] = useState('');
  const [imageToUpload, setImageToUpload] = useState('');
  const [username, setUsername] = useState('');
  const [about, setAbout] = useState('Loading...');

  const [themeing, setTheme] = useState(1);
  const Selected_theme = useSelector(state => state.auth.theme || 'Dark');
  const {user, token} = useSelector(state => {
    return {user: state.auth.user || null, token: state.auth.token || ''};
  });
  // const token = useSelector(state => state.auth.token || '');

  const dispatch = useDispatch();
  useEffect(() => {
    if (user !== null) {
      setUsername(user?.name ? user.name : '');
      setAbout(user?.about ? user.about : 'Loading...');
      setUserImage(user?.image ? Config.getImageUrl(user.image) : '');
    }
  }, [user]);

  const logoutPress = () => {
    dispatch({type: 'SIGNOUT'});
  };


  const updateUser = async _user => {
    if (_user !== null) {
      let formData = new FormData();
      formData.append('name', username);
      formData.append('about', about);
      formData.append('password', '');
      if (imageToUpload != '') {
        formData.append('file', {
          uri: imageToUpload,
          type: 'image/jpeg',
          name: 'userPhoto' + new Date().getTime() + '.png',
        });
      }
      let response = await apiWithTokenMultipart(
        Config.endpoints.updateUser,
        Config.type.post,
        formData,
        token,
        setIsLoading,
      ).catch(err => console.log('error'));
      if (response.data !== null && response.data.user) {
        dispatch({type: 'UPDATE', payload: response.data.user});
      }
    }
  };
  
  const takePhoto = async () => {
    updateUser();
    const result = await launchImageLibrary();
    if (result.assets && result.assets[0]) {
      setUserImage(result.assets[0].uri);
      setImageToUpload(result.assets[0].uri);
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
            Settings
          </TextFormated>
          <Text></Text>
        </View>

        <ImageBackground
          source={{
            uri: userImage !== '' ? userImage : 'http://picsum.photos/500',
          }}
          imageStyle={{
            height: 120,
            width: 120,
            resizeMode: 'cover',
            borderRadius: 100,
            backgroundColor: theme.colors.C4C4C4,
          }}
          style={{
            alignSelf: 'center',
            height: 120,
            width: 120,
            resizeMode: 'cover',
            borderRadius: 100,
            backgroundColor: theme.colors.C4C4C4,
            marginTop: 50,
          }}>
          <View style={{position: 'absolute', right: 10, bottom: 0}}>
            <TouchableOpacity
              style={{
                paddingVertical: 6,
                paddingHorizontal: 6,
                borderRadius: 50,
                backgroundColor: theme.colors.OtherText,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={takePhoto}>
              <FontAwesome
                name="edit"
                size={16}
                color={theme.colors.Light_Gray}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <TextFormatted
          style={{
            fontSize: 22,
            fontWeight: '700',
            color:
              Selected_theme == 'Dark'
                ? theme.colors.White
                : theme.light_colors.White,
            alignSelf: 'center',
            marginTop: 20,
          }}>
          {username}
        </TextFormatted>
        <View
          style={{
            fontSize: 22,
            fontWeight: '700',
            color:
              Selected_theme == 'Dark'
                ? theme.colors.White
                : theme.light_colors.White,
            // alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TextFormatted
            style={{
              alignSelf: 'center',
              color: theme.colors.OtherText,
            }}>
            {about}
          </TextFormatted>
          
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('UpdateUserInfo')}
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
          marginTop: 40,
        }}>
        <View style={{}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: Dimensions.get('window').width - 75,
              justifyContent: 'space-between',
            }}>
            <TextFormated
              style={{
                fontWeight: '700',
                color:
                  Selected_theme == 'Dark'
                    ? theme.colors.Light_Gray
                    : theme.light_colors.Light_Gray,
              }}
             >
              Update Account Info
            </TextFormated>
            <Feather
              name="chevron-right"
              size={16}
              color={theme.colors.White}
              onPress={() => navigation.navigate('UpdateUserInfo')}
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* <TouchableOpacity
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
        }}>
        <View style={{}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: Dimensions.get('window').width - 75,
              justifyContent: 'space-between',
            }}>
            <TextFormated
              style={{
                fontWeight: '700',
                color:
                  Selected_theme == 'Dark'
                    ? theme.colors.Light_Gray
                    : theme.light_colors.Light_Gray,
              }}>
              Change Security Question
            </TextFormated>
            <Feather
              name="chevron-right"
              size={16}
              color={theme.colors.White}
            />
          </View>
        </View>
      </TouchableOpacity> */}
      {false && (
        <View
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
          }}>
          <View style={{}}>
            <TextFormated
              style={{
                fontWeight: '700',
                color:
                  Selected_theme == 'Dark'
                    ? theme.colors.Light_Gray
                    : theme.light_colors.Light_Gray,
              }}>
              Change Lock Options
            </TextFormated>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: Dimensions.get('window').width - 75,
                // justifyContent: 'space-between',
                marginTop: 10,
              }}>
              {/* <View style={{height: 50}} /> */}

              <TouchableOpacity
                onPress={() => setSelected(1)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    paddingVertical: 7,
                    paddingHorizontal: 7,
                    backgroundColor:
                      selected == 1
                        ? theme.colors.Light_Gray
                        : theme.colors.Background,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: theme.colors.Light_Gray,
                    marginRight: 5,
                  }}></View>
                <TextFormated
                  style={{
                    fontWeight: '500',
                    color: theme.colors.Light_Gray,
                    fontSize: 12,
                  }}>
                  Passcode
                </TextFormated>
              </TouchableOpacity>
              <View style={{width: 30}} />
              <TouchableOpacity
                onPress={() => setSelected(2)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    paddingVertical: 7,
                    paddingHorizontal: 7,
                    backgroundColor:
                      selected == 2
                        ? theme.colors.Light_Gray
                        : theme.colors.Background,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: theme.colors.Light_Gray,
                    marginRight: 5,
                  }}></View>
                <TextFormated
                  style={{
                    fontWeight: '500',
                    color: theme.colors.Light_Gray,
                    fontSize: 12,
                  }}>
                  Fingerprint
                </TextFormated>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <View
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
        }}>
        <View style={{}}>
          <TextFormated
            style={{
              fontWeight: '700',
              color:
                Selected_theme == 'Dark'
                  ? theme.colors.Light_Gray
                  : theme.light_colors.Light_Gray,
            }}>
            Change Theme
          </TextFormated>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: Dimensions.get('window').width - 75,
              // justifyContent: 'space-between',
              marginTop: 10,
            }}>
            {/* <View style={{height: 50}} /> */}

            <TouchableOpacity
              onPress={() => {
                store.dispatch({
                  type: THEME,
                  payload: {theme: 'Dark'},
                });
                setTheme(1);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  paddingVertical: 7,
                  paddingHorizontal: 7,
                  backgroundColor:
                    themeing == 1
                      ? theme.colors.Light_Gray
                      : theme.colors.Background,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: theme.colors.Light_Gray,
                  marginRight: 5,
                }}></View>
              <TextFormated
                style={{
                  fontWeight: '500',
                  color: theme.colors.Light_Gray,
                  fontSize: 12,
                }}>
                Dark
              </TextFormated>
            </TouchableOpacity>
            <View style={{width: 30}} />
            <TouchableOpacity
              onPress={() => {
                store.dispatch({
                  type: THEME,
                  payload: {theme: 'Light'},
                });
                setTheme(2);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  paddingVertical: 7,
                  paddingHorizontal: 7,
                  backgroundColor:
                    themeing == 2
                      ? theme.colors.Light_Gray
                      : theme.colors.Background,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: theme.colors.Light_Gray,
                  marginRight: 5,
                }}></View>
              <TextFormated
                style={{
                  fontWeight: '500',
                  color: theme.colors.Light_Gray,
                  fontSize: 12,
                }}>
                Light
              </TextFormated>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('ChangePassword')}
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
        }}>
        <View style={{}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: Dimensions.get('window').width - 75,
              justifyContent: 'space-between',
            }}>
            <TextFormated
              style={{
                fontWeight: '700',
                color:
                  Selected_theme == 'Dark'
                    ? theme.colors.Light_Gray
                    : theme.light_colors.Light_Gray,
              }}
              >
              Change Password
            </TextFormated>
            <Feather
              name="chevron-right"
              size={16}
              color={theme.colors.White}
              onPress={() => navigation.navigate('ChangePassword')}
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
        onPress={logoutPress}>
        <View style={{}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: Dimensions.get('window').width - 75,
              justifyContent: 'space-between',
            }}>
            <TextFormated
              style={{
                fontWeight: '700',
                color:
                  Selected_theme == 'Dark'
                    ? theme.colors.Light_Gray
                    : theme.light_colors.Light_Gray,
              }}>
              Sign out
            </TextFormated>
            {/* <Feather
              name="chevron-right"
              size={16}
              color={theme.colors.White}
            /> */}
          </View>
        </View>
      </TouchableOpacity>
      <Loader loading={isLoading} />
    </ScrollView>
  );
}
