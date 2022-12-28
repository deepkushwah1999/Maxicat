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
import { theme } from '../../Utils/theme';
import Feather from 'react-native-vector-icons/dist/Feather';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import TextFormatted from '../../Components/TextFormated';
import { useState } from 'react';
import Button from '../../Components/Button';
import { useSelector } from 'react-redux';

const DATA = [
  {
    id: '1',
    userName: 'John D’souza',
    userImg: 'https://picsum.photos/500',
    messageTime: 'QAR 20.00/ Hr',
    messageText: 'Basketball Trainer',
    location: 'Sudama Nagar',
    type: 'user',
  },
  {
    id: '2',
    userName: 'Friends Group',
    userImg: 'https://picsum.photos/500',

    messageTime: 'QAR 20.00/ Hr',
    messageText: 'Basketball Trainer',
    location: 'Sudama Nagar',
    type: 'group',
  },
  {
    id: '3',
    userName: 'Sohail Khan',
    userImg: 'https://picsum.photos/500',

    messageTime: 'QAR 20.00/ Hr',
    messageText: 'Basketball Trainer',
    location: 'Sudama Nagar',
    type: 'user',
  },
];

export default function Home({ navigation }) {
  const [selected, setSelected] = useState(1);
  const [name, setName] = useState('');
  const Selected_theme = useSelector(state => state.auth.theme || 'Dark');


  const nextHandler = () => {
    navigation.navigate('SelectUser')
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
            Create Group
          </TextFormated>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}> */}
          <TextFormated
            style={{
              fontWeight: 'bold',
              color: theme.colors.Like,
            }}></TextFormated>
          {/* </TouchableOpacity> */}
        </View>

        <ImageBackground
          source={{ uri: 'http://picsum.photos/500' }}
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
          <View style={{ position: 'absolute', right: 10, bottom: 0 }}>
            <TouchableOpacity
              style={{
                paddingVertical: 6,
                paddingHorizontal: 6,
                borderRadius: 50,
                backgroundColor: theme.colors.OtherText,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => { }}>
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
          {name || 'Group Name'}
        </TextFormatted>
        {/* <TextFormatted
          style={{
            alignSelf: 'center',
            color: theme.colors.OtherText,
          }}>
          Stay always come on sky for shine
        </TextFormatted> */}
      </View>
      <View>
        <View
          style={{
            marginVertical: 8,
            backgroundColor:
              Selected_theme == 'Dark'
                ? theme.colors.Background
                : theme.light_colors.Background,
            // paddingVertical: 12,
            paddingHorizontal: 15,
            marginHorizontal: 20,
            borderRadius: 10,
            borderColor: theme.colors.list_bg,
            borderWidth: 1,
            borderColor: theme.colors.Button,
            marginTop: 40,
          }}>
          <TextInput
            placeholder="Group Name"
            placeholderTextColor={theme.colors.background}
            style={{
              fontSize: 12,
              padding: 9,
              color: theme.colors.Button,
              flex: 1,
            }}
            keyboardType="email-address"
            onSubmitEditing={() => navigation.navigate('SelectUser')}
            onChangeText={v => setName(v)}
          />
        </View>
        <View style={{ height: 50 }} />
        <Button
          backgroundColor={theme.colors.Button}
          onPress={nextHandler}
          ButtonText="Next"
        />
      </View>
    </ScrollView>
  );
}
