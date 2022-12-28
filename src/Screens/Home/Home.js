import {
  View,
  Text,
  Dimensions,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import TextFormated from '../../Components/TextFormated';
import Statusbar from '../../Components/Statusbar';
import { theme } from '../../Utils/theme';
import Feather from 'react-native-vector-icons/dist/Feather';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useDispatch, useSelector } from 'react-redux';
import { apiWithToken } from '../../Utils/api';
import Config from '../../Utils/Config';
import { Loader } from '../../Components/Loader';

import { io } from 'socket.io-client';
import SocketIOClient from 'socket.io-client';

export default function Home({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const hideMenu = () => setVisible(false);

  const socketRef = useRef();

  const Selected_theme = useSelector(state => state.auth.theme || 'Dark');
  const user = useSelector(state => state.auth.user || null);
  const state = useSelector(state => state.chat);
  console.log('state', state)
  const token = useSelector(state => state.auth.token || '');

  const dispatch = useDispatch();
  useEffect(() => {
    // setSocket(io(Config.base, { transports: ["websocket", "polling"]  }))
    // socketRef.current = io.connect(Config.base)
    socketRef.current = io.connect(Config.base);
    console.log('socketConnect');
    dispatch({ type: 'SOCKET', payload: { socket: 'user' } });
  }, []);

  useEffect(() => {
    socketRef?.current?.on('connect', () => {
      // console.log('socket_id-->', socket.id); // x8WIv7-mJelg7on_ALbx
    });
    // console.log(' after connect',socketRef?.current)

    socketRef?.current?.on('connect_error', err => {
      console.log('err', err);
    });

    socketRef?.current.on('error', error => {
      console.log('error', error);
    });

    socketRef?.current.on('getMessage', message => {
      console.log('message', message);
    });

    if (user && socket) {
      socketRef?.current.emit('addUser', user?._id);
      console.log('after add user ', socket)
    }

    socketRef?.current.on('getUsers', liveUsers => {
      console.log('users', liveUsers)
      dispatch({ type: 'LIVE_USERS', payload: { liveUsers: users } });
    });
  }, [socket, user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getConversations();
    });
    return unsubscribe;
  }, [navigation]);

  const getConversations = async () => {
    if (user !== null) {
      let response = await apiWithToken(
        Config.endpoints.getConversations + user._id,
        'GET',
        {},
        token,
        setIsLoading,
      ).catch(err => console.log('error', err));
      console.log('response', response);
      if (response && response.data !== null) {
        setConversations(response.data.conversation || []);
        setFilteredConversations(response.data.conversation || []);
      }
    }
  };

  const chatPress = item => {
    navigation.navigate('Chat', { conversation: item, isNewConversation: false });
  };
  const newMessagePress = item => {
    // console.log('state: ', state);
    dispatch({ type: 'SOCKET', payload: { socket: 'user' } });
    // navigation.navigate('AllUsers')
  };
  const changeFilter = text => {
    if (text === '') setFilteredConversations(conversations);
    setFilteredConversations(
      conversations.filter(item => item.user.name.includes(text)),
    );
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
        backgroundColor={
          Selected_theme == 'Dark'
            ? theme.colors.Background
            : theme.light_colors.Background
        }
        barStyle={Selected_theme == 'Dark' ? 'light-content' : 'dark-content'}
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
          <TextFormated
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: theme.colors.Button,
            }}>
            {user.name}
          </TextFormated>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: Dimensions.get('window').width / 3,
            }}>
            {/* <TouchableOpacity>
              <Entypo
                name="emoji-happy"
                size={24}
                color={
                  Selected_theme == 'Dark'
                    ? theme.colors.Light_Gray
                    : theme.colors.Background
                }
              />
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => navigation.navigate('OurProjects')}>
              <MaterialCommunityIcons
                name="bookmark"
                size={24}
                color={
                  Selected_theme == 'Dark'
                    ? theme.colors.Light_Gray
                    : theme.colors.Background
                }
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Entypo
                name="share"
                size={24}
                color={
                  Selected_theme == 'Dark'
                    ? theme.colors.Light_Gray
                    : theme.colors.Background
                }
              />
            </TouchableOpacity>
            <Menu
              style={{ backgroundColor: theme.colors.MenuBg }}
              visible={visible}
              anchor={
                <SimpleLineIcons
                  name="options-vertical"
                  size={20}
                  style={{ paddingHorizontal: 15 }}
                  color={
                    Selected_theme == 'Dark'
                      ? theme.colors.Light_Gray
                      : theme.colors.Background
                  }
                  onPress={() => setVisible(true)}
                />
              }
              onRequestClose={hideMenu}>
              <MenuItem
                textStyle={{
                  color:
                    Selected_theme == 'Dark'
                      ? theme.colors.White
                      : theme.light_colors.Black,
                }}
                onPress={() => navigation.navigate('CreateGroup')}>
                Create group
              </MenuItem>
              <MenuItem
                textStyle={{
                  color:
                    Selected_theme == 'Dark'
                      ? theme.colors.White
                      : theme.light_colors.Black,
                }}
                onPress={() => navigation.navigate('Settings')}>
                Settings
              </MenuItem>
            </Menu>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: 30,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          <View
            style={{
              backgroundColor: theme.colors.inputbg2,
              paddingHorizontal: 10,
              height: 40,
              borderRadius: 5,
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Feather
                name="search"
                size={20}
                color={theme.colors.Light_Gray}
              />
              <TextInput
                placeholder="Search for the chats..."
                onChangeText={text => changeFilter(text)}
                placeholderTextColor={theme.colors.Light_Gray}
                style={{ flex: 1, color: theme.colors.Light_Gray }}
              />
            </View>
          </View>
          <View style={{ width: 10 }} />
          <View
            style={{
              backgroundColor: theme.colors.inputbg2,
              paddingHorizontal: 10,
              paddingVertical: 7,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons
              name="bell"
              size={24}
              color={theme.colors.Light_Gray}
            />
          </View>
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
          data={filteredConversations}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => chatPress(item)}
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
                source={{
                  uri: item
                    ? Config.getImageUrl(item?.user?.image)
                    : 'https://picsum.photos/500',
                }}
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
                    {item.user ? item.user.name : 'name'}
                  </TextFormated>
                  <View
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 8,
                      backgroundColor:
                        Selected_theme == 'Dark'
                          ? theme.colors.Light_Gray
                          : theme.light_colors.Light_Gray,
                      borderRadius: 20,
                    }}></View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListHeaderComponent={() =>
            isLoading && (
              <ActivityIndicator style={{ height: 20 }} size={'small'} />
            )
          }
        />
      </View>
      <TouchableOpacity
        onPress={newMessagePress}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 15,
          backgroundColor: theme.colors.Button,
          borderRadius: 120,
          position: 'absolute',
          bottom: 40,
          right: 20,
          // borderWidth: 10,
          // borderColor: theme.colors.Get_Verified,
        }}>
        <MaterialCommunityIcons
          name="message-text"
          size={30}
          color={theme.colors.White}
        />
      </TouchableOpacity>
    </View>
  );
}
