import {
  View,
  Text,
  Dimensions,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import TextFormated from '../../Components/TextFormated';
import Statusbar from '../../Components/Statusbar';
import { theme } from '../../Utils/theme';
import Feather from 'react-native-vector-icons/dist/Feather';

import { useSelector } from 'react-redux';
import { apiWithToken } from '../../Utils/api';
import Config from '../../Utils/Config';
import { Loader } from '../../Components/Loader';

const DATA = [
  {
    id: 1,
    userName: 'John D’souza',
    userImg: 'https://picsum.photos/500',
    messageTime: 'QAR 20.00/ Hr',
    messageText: 'Basketball Trainer',
    location: 'Sudama Nagar',
    type: 'user',
  },
  {
    id: 2,
    userName: 'Friends Group',
    userImg: 'https://picsum.photos/500',

    messageTime: 'QAR 20.00/ Hr',
    messageText: 'Basketball Trainer',
    location: 'Sudama Nagar',
    type: 'group',
  },
  {
    id: 3,
    userName: 'Sohail Khan',
    userImg: 'https://picsum.photos/500',

    messageTime: 'QAR 20.00/ Hr',
    messageText: 'Basketball Trainer',
    location: 'Sudama Nagar',
    type: 'user',
  },
  {
    id: 4,
    userName: 'John D’souza',
    userImg: 'https://picsum.photos/500',
    messageTime: 'QAR 20.00/ Hr',
    messageText: 'Basketball Trainer',
    location: 'Sudama Nagar',
    type: 'user',
  },
  {
    id: 5,
    userName: 'Friends Group',
    userImg: 'https://picsum.photos/500',

    messageTime: 'QAR 20.00/ Hr',
    messageText: 'Basketball Trainer',
    location: 'Sudama Nagar',
    type: 'group',
  },
  {
    id: 6,
    userName: 'Sohail Khan',
    userImg: 'https://picsum.photos/500',

    messageTime: 'QAR 20.00/ Hr',
    messageText: 'Basketball Trainer',
    location: 'Sudama Nagar',
    type: 'user',
  },
  {
    id: 7,
    userName: 'Sohail Khan',
    userImg: 'https://picsum.photos/500',

    messageTime: 'QAR 20.00/ Hr',
    messageText: 'Basketball Trainer',
    location: 'Sudama Nagar',
    type: 'user',
  },
  {
    id: 8,
    userName: 'Sohail Khan',
    userImg: 'https://picsum.photos/500',

    messageTime: 'QAR 20.00/ Hr',
    messageText: 'Basketball Trainer',
    location: 'Sudama Nagar',
    type: 'user',
  },
  {
    id: 9,
    userName: 'Sohail Khan',
    userImg: 'https://picsum.photos/500',

    messageTime: 'QAR 20.00/ Hr',
    messageText: 'Basketball Trainer',
    location: 'Sudama Nagar',
    type: 'user',
  },
  {
    id: 10,
    userName: 'Sohail Khan',
    userImg: 'https://picsum.photos/500',

    messageTime: 'QAR 20.00/ Hr',
    messageText: 'Basketball Trainer',
    location: 'Sudama Nagar',
    type: 'user',
  },
];

export default function Home({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const hideMenu = () => setVisible(false);
  const [selected, setSelected] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const Selected_theme = useSelector(state => state.auth.theme || 'Dark');
  const token = useSelector(state => state.auth.token || '');


  useEffect(() => {
    getAllUsers()
  }, [])


  const getAllUsers = async () => {
    if (token !== null) {
      let response = await apiWithToken(Config.endpoints.getAllUsers, 'GET', {}, token, setIsLoading).catch(err => console.log('error'))
      if (response.data !== null) {
        console.log('users-->', JSON.stringify(response))
        setAllUsers(response.data.users || [])
      }
    }
  }

  const selectUser = (user) => {
    navigation.replace('Chat', { user: user, isNewConversation: true })
  }



  const selectAllBill = () => {
    if (selected.length < DATA.length) {
      setSelected([...new Set(DATA.map(item => item.id))]);
    }

    if (selected.length === DATA.length) {
      setSelected([]);
    }
  };

  return (
    <View
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
              color={
                Selected_theme == 'Dark'
                  ? theme.colors.Light_Gray
                  : theme.light_colors.Light_Gray
              }
            />
          </TouchableOpacity>
          <Feather
            name="chevron-left"
            size={24}
            color={theme.colors.Light_Gray}
            style={{ opacity: 0 }}
          />
          <Feather
            name="chevron-left"
            size={24}
            style={{ opacity: 0 }}
            color={theme.colors.Light_Gray}
          />
        </View>
      </View>

      <View
        style={{
          backgroundColor: theme.colors.inputbg2,
          paddingHorizontal: 10,
          height: 40,
          borderRadius: 5,
          marginVertical: 20,
          marginHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Feather name="search" size={20} color={theme.colors.Light_Gray} />
          <TextInput
            placeholder="Search for the chats..."
            placeholderTextColor={theme.colors.Light_Gray}
            style={{ color: theme.colors.Light_Gray }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          // width: Dimensions.get('window').width - 40,
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          // horizontal={true}
          data={allUsers}
          keyExtractor={item => item._id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => selectUser(item)}
              style={{
                flexDirection: 'row',
                marginVertical: 8,
                // width: Dimensions.get('window')width - 40,
                justifyContent: 'space-between',
                backgroundColor:
                  Selected_theme == 'Dark'
                    ? theme.colors.Background
                    : theme.light_colors.Background,
                paddingVertical: 7,
                paddingHorizontal: 15,
                marginHorizontal: 20,
                // borderWidth: 1,
                borderRadius: 10,
                borderBottomWidth: 1,
                borderColor: theme.colors.list_bg,
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: 45,
                  width: 45,
                  resizeMode: 'contain',
                  borderRadius: 50,
                }}
                // source={{ uri: 'https://picsum.photos/500' }}
                source={{ uri: Config.getImageUrl(item.image) }}
              />
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: Dimensions.get('window').width - 130,
                    justifyContent: 'space-between',
                  }}>
                  <TextFormated
                    style={{
                      fontWeight: '700',
                      color:
                        Selected_theme == 'Dark'
                          ? theme.colors.Light_Gray
                          : theme.light_colors.White,
                    }}>
                    {item.name}
                  </TextFormated>
                  {/* <View
                        style={{
                          paddingVertical: 8,
                          paddingHorizontal: 8,
                          backgroundColor: selected.find(r => r === item.id)
                            ? theme.colors.Light_Gray
                            : theme.colors.Background,

                          borderColor: theme.colors.Light_Gray,
                          borderRadius: 20,
                          borderWidth: 1,
                        }}></View> */}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <Loader loading={isLoading} />
    </View>
  );
}
