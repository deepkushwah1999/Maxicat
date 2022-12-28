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
import React, { useEffect } from 'react';
import TextFormated from '../../Components/TextFormated';
import Statusbar from '../../Components/Statusbar';
import { theme } from '../../Utils/theme';
import Feather from 'react-native-vector-icons/dist/Feather';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import TextFormatted from '../../Components/TextFormated';
import { useState } from 'react';
import store from '../../redux/store';
import { THEME } from '../../redux/actionTypes';
import { useSelector, useDispatch } from 'react-redux';

import { launchImageLibrary } from 'react-native-image-picker';
import { apiWithToken, apiWithTokenMultipart } from '../../Utils/api';
import Config from '../../Utils/Config';
import { Loader } from '../../Components/Loader';



export default function UserProfile({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(1);
  const [userImage, setUserImage] = useState('');
  const [imageToUpload, setImageToUpload] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [username, setUsername] = useState('imran');
  const [about, setAbout] = useState('Loading...');

  const [themeing, setTheme] = useState(1);
  const Selected_theme = useSelector(state => state.auth.theme || 'Dark');
  const { user, token } = useSelector(state => { return { user: state.auth.user || null, token: state.auth.token || '' } });
  // const token = useSelector(state => state.auth.token || '');

  // const dispatch = useDispatch();
  const { userProfile } = route.params


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
          // borderWidth: 5,
          // borderColor: 'red',
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
            Profile
          </TextFormated>
          <TouchableOpacity
          //  onPress={updateUser}
          >
            <TextFormated
              style={{
                fontWeight: 'bold',
                color: theme.colors.Like,
              }}>

            </TextFormated>
          </TouchableOpacity>
        </View>

        <ImageBackground
          source={{ uri: Config.getImageUrl(userProfile.image)  }}
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
          {/* <View style={{ position: 'absolute', right: 10, bottom: 0 }}>
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
          </View> */}
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
          {userProfile?.name}
        </TextFormatted>
        <TextFormatted
          style={{
            alignSelf: 'center',
            color: theme.colors.OtherText,
          }}>
          {userProfile?.phone}
        </TextFormatted>
        <TextFormatted
          style={{
            alignSelf: 'center',
            color: theme.colors.OtherText,
          }}>
          {userProfile?.about}
        </TextFormatted>
      </View>

      {false &&
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
                }}>
                Update Account Name
              </TextFormated>
              <Feather
                name="chevron-right"
                size={16}
                color={theme.colors.White}
              />
            </View>
          </View>
        </TouchableOpacity>}

    </ScrollView>
  );
}
