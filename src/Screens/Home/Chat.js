import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {ActivityIndicator, Modal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {theme} from '../../Utils/theme';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import TextFormated from '../../Components/TextFormated';
import {useRoute} from '@react-navigation/native';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {Pressable} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useSelector} from 'react-redux';
import Config from '../../Utils/Config';
import {apiWithToken, apiWithTokenMultipart} from '../../Utils/api';
import {Loader} from '../../Components/Loader';
import {launchImageLibrary} from 'react-native-image-picker';

function Chat({navigation, route}) {
  const {params} = useRoute();
  const [messageSending, setMessageSending] = useState(false);
  const [messageTextInput, setMessageTextInput] = useState('');
  const Selected_theme = useSelector(state => state.auth.theme || 'Dark');
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const [show, setShow] = useState(false);
  const [copy, setCopy] = useState(false);
  const [copyText, setCopyText] = useState('');
  const [receiver, setReceiver] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  const user = useSelector(state => state.auth.user || null);
  const token = useSelector(state => state.auth.token || '');

  useEffect(() => {
    // console.log('conversation',route?.params?.conversation)
    if (route?.params?.user) {
      setReceiver(route?.params?.user);
    }
    if (route?.params?.isNewConversation) {
      createConversation(user, route?.params?.user);
    } else {
      const conv = route?.params?.conversation;
      console.log('conversation', conv);
      setConversation(conv);
      getMessages(conv);
    }
  }, [route.params]);

  const createConversation = async (_user, _receiver) => {
    if (_user !== null && _receiver !== null) {
      const requestData = {
        senderId: _user._id,
        receiverId: _receiver._id,
        conversationType: 'Single',
      };
      let response = await apiWithToken(
        Config.endpoints.createConversation,
        Config.type.post,
        requestData,
        token,
      ).catch(err => console.log('error'));
      if (response.data !== null) {
        setConversation(response.data.conversation);
        console.log('createConversationResponse-->', response);
      }
    }
  };
  const getMessages = async _conversation => {
    if (_conversation !== null) {
      let url = Config.endpoints.getAllMessages + '/' + _conversation._id;
      let response = await apiWithToken(url, Config.type.get, {}, token).catch(
        err => console.log('error', err),
      );
      if (response && response.data !== null) {
        setMessages(response.data.messages.reverse() || []);
      }
    }
  };

  const sendMessage = async () => {
    if (conversation !== null && messageTextInput !== '') {
      const requestData = {
        conversationId: conversation._id,
        sender: user._id,
        text: messageTextInput,
      };
      let response = await apiWithToken(
        Config.endpoints.sendNewMessage,
        Config.type.post,
        requestData,
        token,
        setMessageSending,
      ).catch(err => console.log('error'));
      if (response.data !== null) {
        // setMessages(response.data.messages || [])
        getMessages(conversation);
        setMessageTextInput('');
      }
    }
  };
  const sendFileMessage = async file => {
    if (conversation !== null) {
      let formData = new FormData();
      formData.append('conversationId', conversation._id);
      formData.append('sender', user._id);
      formData.append('file', {
        uri: file,
        type: 'image/jpeg',
        name: 'chat' + new Date().getTime() + '.png',
      });

      let response = await apiWithTokenMultipart(
        Config.endpoints.sendFileMessage,
        Config.type.post,
        formData,
        token,
        setMessageSending,
      ).catch(err => console.log('error', err));
      if (response.data !== null) {
        getMessages(conversation);
        // setMessageTextInput('')
      }
    }
  };
  const photoPressed = async () => {
    const result = await launchImageLibrary();
    if (result.assets && result.assets[0]) {
      console.log(result.assets[0].uri);
      sendFileMessage(result.assets[0].uri);
    }
  };
  const attachmentPressed = () => {};
  const userPressed = () => {
    navigation.navigate('UserProfile', {userProfile: conversation.user});
  };

  return (
    <ImageBackground
      style={{
        flex: 1,
        backgroundColor:
          Selected_theme == 'Dark'
            ? theme.colors.Background
            : theme.light_colors.Background,
        justifyContent: 'space-between',
      }}
      source={require('../../assets/bg.png')}>
      <View
        style={{
          backgroundColor:
            Selected_theme == 'Dark'
              ? theme.colors.Background
              : theme.light_colors.Background,
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicons
              name="chevron-back"
              size={30}
              color={
                Selected_theme == 'Dark'
                  ? theme.colors.Light_Gray
                  : theme.light_colors.Light_Gray
              }
              onPress={() => navigation.goBack()}
            />

            <Pressable onPress={() => userPressed()}>
              <Image
                style={{
                  height: 45,
                  width: 45,
                  resizeMode: 'contain',
                  borderRadius: 50,
                  marginRight: 15,
                }}
                source={{
                  uri: conversation
                    ? Config.getImageUrl(conversation.user.image)
                    : 'https://picsum.photos/500',
                }}
              />
            </Pressable>
            <View>
              <TextFormated
                style={{
                  fontWeight: 'bold',
                  color:
                    Selected_theme == 'Dark'
                      ? theme.colors.White
                      : theme.light_colors.White,
                }}>
                {conversation ? conversation?.user?.name : ''}
              </TextFormated>
              <TextFormated
                style={{
                  fontSize: 12,
                  // fontWeight: 'bold',
                  color:
                    Selected_theme == 'Dark'
                      ? theme.colors.White
                      : theme.light_colors.White,
                }}>
                {params.type == 'group' ? 'About of group' : 'Online'}
              </TextFormated>
            </View>
          </View>

          {params.type != 'group' ? (
            <Menu
              style={{
                backgroundColor: theme.colors.MenuBg,
                // width: Dimensions.get('window').width / 3,
                // alignSelf: 'flex-end',
              }}
              visible={visible}
              anchor={
                <SimpleLineIcons
                  name="options-vertical"
                  size={20}
                  color={
                    Selected_theme == 'Dark'
                      ? theme.colors.Light_Gray
                      : theme.light_colors.Light_Gray
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
                onPress={hideMenu}>
                Hide chat
              </MenuItem>
              <MenuItem
                textStyle={{
                  color:
                    Selected_theme == 'Dark'
                      ? theme.colors.White
                      : theme.light_colors.Black,
                }}
                onPress={hideMenu}>
                Lock chat
              </MenuItem>
              <MenuItem
                textStyle={{
                  color:
                    Selected_theme == 'Dark'
                      ? theme.colors.White
                      : theme.light_colors.Black,
                }}
                onPress={hideMenu}>
                Block chat
              </MenuItem>
              <MenuItem
                textStyle={{
                  color:
                    Selected_theme == 'Dark'
                      ? theme.colors.White
                      : theme.light_colors.Black,
                }}
                onPress={() => {
                  hideMenu();
                  navigation.navigate('Font');
                }}>
                Font
              </MenuItem>
              <MenuItem
                textStyle={{
                  color:
                    Selected_theme == 'Dark'
                      ? theme.colors.White
                      : theme.light_colors.Black,
                }}
                onPress={() => navigation.navigate('Wallpaper')}>
                Wallpaper
              </MenuItem>
            </Menu>
          ) : (
            <Menu
              style={{
                backgroundColor: theme.colors.MenuBg,
                // width: Dimensions.get('window').width / 3,
                // alignSelf: 'flex-end',
              }}
              visible={visible}
              anchor={
                <SimpleLineIcons
                  name="options-vertical"
                  size={20}
                  color={
                    Selected_theme == 'Dark'
                      ? theme.colors.Light_Gray
                      : theme.light_colors.Light_Gray
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
                onPress={() => {
                  hideMenu();
                  navigation.navigate('SelectUser');
                }}>
                Add Members
              </MenuItem>
              <MenuItem
                textStyle={{
                  color:
                    Selected_theme == 'Dark'
                      ? theme.colors.White
                      : theme.light_colors.Black,
                }}
                onPress={() => {
                  hideMenu();
                  navigation.navigate('RemoveUser');
                }}>
                Remove Members
              </MenuItem>
              <MenuItem
                textStyle={{
                  color:
                    Selected_theme == 'Dark'
                      ? theme.colors.White
                      : theme.light_colors.Black,
                }}
                onPress={() => {
                  hideMenu();
                  setShow(true);
                }}>
                Leave Group
              </MenuItem>
              <MenuItem
                textStyle={{
                  color:
                    Selected_theme == 'Dark'
                      ? theme.colors.White
                      : theme.light_colors.Black,
                }}
                onPress={hideMenu}>
                Invite Members
              </MenuItem>
              <MenuItem
                textStyle={{
                  color:
                    Selected_theme == 'Dark'
                      ? theme.colors.White
                      : theme.light_colors.Black,
                }}
                onPress={() => {
                  hideMenu();
                  navigation.navigate('Font');
                }}>
                Font
              </MenuItem>
              <MenuItem
                textStyle={{
                  color:
                    Selected_theme == 'Dark'
                      ? theme.colors.White
                      : theme.light_colors.Black,
                }}
                onPress={() => navigation.navigate('Wallpaper')}>
                Wallpaper
              </MenuItem>
            </Menu>
          )}
        </View>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item._id}
        data={messages}
        // scrollEnabled={false}
        inverted
        renderItem={({item, index}) => {
          const isOwn = item.sender == user._id;
          return (
            <Pressable
              onLongPress={() => {
                setCopyText(item.text);
                setCopy(true);
              }}
              style={{alignItems: isOwn ? 'flex-end' : 'flex-start', flex: 1}}>
              {
                <View
                  style={[
                    styles.SamePerson,
                    {
                      flexDirection: isOwn ? 'row' : 'row-reverse',
                      alignItems: 'center',
                    },
                  ]}>
                  <View
                    style={{
                      alignItems: isOwn == true ? 'flex-start' : 'flex-end',
                      maxWidth: '85%',
                    }}>
                    <Text
                      style={[
                        styles.time,
                        {
                          color: '#7A7A7A',
                          alignSelf: isOwn == true ? 'flex-start' : 'flex-end',
                        },
                      ]}>
                      10:30 Am
                    </Text>
                    {item.file == '' && (
                      <View
                        style={[
                          styles.msg_Container,
                          {
                            backgroundColor: isOwn
                              ? theme.colors.MyChatBg
                              : theme.colors.MsgBg,
                          },
                        ]}>
                        <Text
                          style={{
                            fontFamily: 'BubblegumSans',
                            color: isOwn ? '#fff' : '#000',
                          }}>
                          {item.text}
                        </Text>
                      </View>
                    )}
                    {item.file !== '' && (
                      <View>
                        <Image
                          style={{
                            height: 235,
                            width: 235,
                            resizeMode: 'cover',
                            // borderRadius: 10,
                            marginRight: 15,
                          }}
                          source={{uri: Config.getImageUrl(item.file)}}
                        />
                      </View>
                    )}
                  </View>
                  {isOwn ? (
                    <View />
                  ) : (
                    <View />
                    // <Image
                    //   style={{
                    //     height: 35,
                    //     width: 35,
                    //     resizeMode: 'contain',
                    //     borderRadius: 50,
                    //     marginRight: 15,
                    //   }}
                    //   source={{ uri: 'https://picsum.photos/500' }}
                    // />
                  )}
                </View>
              }
            </Pressable>
          );
        }}
      />

      <View
        style={{
          backgroundColor:
            Selected_theme == 'Dark'
              ? theme.colors.Background
              : theme.light_colors.Background,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,

          // borderWidth: 2,
          // border color: Selected_theme
          paddingVertical: 10,
        }}>
        <Pressable onPress={() => photoPressed()}>
          <MaterialIcons
            name="insert-photo"
            size={24}
            color={
              Selected_theme == 'Dark'
                ? theme.colors.Light_Gray
                : theme.light_colors.Light_Gray
            }
          />
        </Pressable>
        <View style={{width: 5}} />
        <Pressable onPress={() => attachmentPressed()}>
          <MaterialIcons
            name="attachment"
            size={24}
            color={
              Selected_theme == 'Dark'
                ? theme.colors.Light_Gray
                : theme.light_colors.Light_Gray
            }
          />
        </Pressable>
        <View
          style={{
            backgroundColor:
              Selected_theme == 'Dark'
                ? theme.colors.Background
                : theme.light_colors.Background,
            paddingHorizontal: 10,
            // height: 40,
            borderRadius: 5,
            flex: 1,
          }}>
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor:
                Selected_theme == 'Dark'
                  ? theme.colors.Background
                  : theme.light_colors.Background,
              borderRadius: 50,
            }}>
            <TextInput
              maxHeight={100}
              multiline={true}
              placeholder="Type a Message"
              style={{flex: 1, padding: 5}}
              value={messageTextInput}
              onChangeText={setMessageTextInput}
              placeholderTextColor={
                Selected_theme == 'Dark'
                  ? theme.colors.Light_Gray
                  : theme.light_colors.Light_Gray
              }
              color={
                Selected_theme == 'Dark'
                  ? theme.colors.Light_Gray
                  : theme.light_colors.Light_Gray
              }
            />
            {/* <Entypo
              name="emoji-happy"
              size={24}
              color={
                Selected_theme == 'Dark'
                  ? theme.colors.Light_Gray
                  : theme.light_colors.Light_Gray
              }
            /> */}
          </View>
        </View>

        {/* <View style={{width: 20, borderWidth: 1}} /> */}
        {messageSending ? (
          <ActivityIndicator color="#C819DC" />
        ) : (
          <View
            style={{
              paddingVertical: 8,
              paddingHorizontal: 8,
              backgroundColor:
                Selected_theme == 'Dark'
                  ? theme.colors.Light_Gray
                  : theme.light_colors.Light_Gray,
              borderRadius: 120,
              // position: 'absolute',
              // bottom: 40,
              // right: 20,
            }}>
            <MaterialIcons
              size={20}
              name="send"
              color={theme.colors.Gray}
              onPress={() => {
                sendMessage();
                // alert();
              }}
            />
          </View>
        )}
      </View>
      <Modal
        animationType={'fade'}
        // transparent={false}
        visible={show}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <TouchableOpacity
          onPress={() => setShow(false)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
            height: '100%',
            width: '100%',
          }}>
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor:
                Selected_theme == 'Dark'
                  ? theme.colors.Background
                  : theme.light_colors.Background,
              height: 120,
              width: '80%',
              borderRadius: 10,
              paddingHorizontal: 15,
            }}>
            <TextFormated
              style={{
                color:
                  Selected_theme == 'Dark'
                    ? theme.colors.White
                    : theme.light_colors.White,
                marginVertical: 20,
                fontSize: 12,
                fontWeight: '700',
              }}>
              Are you sure you want to leave group?
            </TextFormated>

            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 15,
                width: '80%',
              }}>
              <TouchableOpacity onPress={() => setShow(false)}>
                <TextFormated
                  style={{
                    color:
                      Selected_theme == 'Dark'
                        ? theme.colors.White
                        : theme.light_colors.White,
                    marginVertical: 20,
                    fontSize: 12,
                    fontWeight: '600',
                  }}>
                  Cancel
                </TextFormated>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <TextFormated
                  style={{
                    color: 'red',
                    marginVertical: 20,
                    fontSize: 12,
                    fontWeight: '600',
                  }}>
                  Sure
                </TextFormated>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType={'fade'}
        visible={copy}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <TouchableOpacity
          onPress={() => setCopy(false)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}>
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor:
                Selected_theme == 'Dark'
                  ? theme.colors.Background
                  : theme.light_colors.Background,
              height: 120,
              width: '80%',
              borderRadius: 10,
              paddingHorizontal: 15,
            }}>
            <TextFormated
              style={{
                color:
                  Selected_theme == 'Dark'
                    ? theme.colors.White
                    : theme.light_colors.White,
                marginVertical: 20,
                fontSize: 12,
                fontWeight: '700',
              }}>
              {copyText}{' '}
            </TextFormated>

            <View
              style={{
                justifyContent: 'space-between',
                width: '80%',
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 15,
              }}>
              <TouchableOpacity onPress={() => setCopy(false)}>
                <TextFormated
                  style={{
                    color:
                      Selected_theme == 'Dark'
                        ? theme.colors.White
                        : theme.light_colors.White,
                    marginVertical: 20,
                    fontSize: 12,
                    fontWeight: '600',
                  }}>
                  Cancel
                </TextFormated>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(copyText);
                  setCopy(false);
                  // navigation.goBack();
                }}>
                <TextFormated
                  style={{
                    color: theme.colors.Like,
                    marginVertical: 20,
                    fontSize: 12,
                    fontWeight: '600',
                  }}>
                  Copy
                </TextFormated>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => {
                  deleteMessage();
                  setCopy(false);
                  // navigation.goBack();
                }}>
                <TextFormated
                  style={{
                    color: theme.colors.Like,
                    marginVertical: 20,
                    fontSize: 12,
                    fontWeight: '600',
                  }}>
                  Delete
                </TextFormated>
              </TouchableOpacity> */}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <Loader loading={isLoading} />
    </ImageBackground>
  );
}

export default Chat;

const styles = StyleSheet.create({
  Conversation_start_container: {
    flexDirection: 'row',
    // width: '100%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 30,
  },
  Conversation_start_Text: {
    fontSize: 15,
    fontFamily: Platform.OS == 'android' ? 'Poppins-SemiBold' : null,
    fontWeight: '700',
  },
  SamePerson: {
    alignItems: 'center',
    marginBottom: 5,
    marginHorizontal: 20,
  },
  msg_Container: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 108,
    // elevation: 10,
  },
  time: {
    alignSelf: 'flex-end',
    fontSize: 8,
    marginTop: 5,
  },
});
