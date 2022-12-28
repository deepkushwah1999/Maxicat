import {
  View,
  Text,
  Dimensions,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import TextFormated from '../../Components/TextFormated';
import Statusbar from '../../Components/Statusbar';
import {theme} from '../../Utils/theme';
import Feather from 'react-native-vector-icons/dist/Feather';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {useSelector} from 'react-redux';

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
];

export default function Home({navigation}) {
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const [selected, setSelected] = useState([]);
  // alert(selected);
  const Selected_theme = useSelector(state => state.auth.theme || 'Dark');

  // alert(JSON.stringify(Selected_theme));

  const isSelected = selected.filter(v => v === v.id); // checking if the item is already selected

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
          <TextFormated
            style={{
              fontWeight: 'bold',
              color:
                Selected_theme == 'Dark'
                  ? theme.colors.White
                  : theme.light_colors.White,
            }}>
            Font Size & Style
          </TextFormated>

          <Feather
            name="chevron-left"
            size={24}
            color={theme.colors.Light_Gray}
            style={{opacity: 0}}
          />
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            flex: 1,
            // width: Dimensions.get('window').width - 40,
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            // numColumns={2}
            data={DATA}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  marginVertical: 8,
                  backgroundColor:
                    Selected_theme == 'Dark'
                      ? theme.colors.Background
                      : theme.light_colors.Background,
                  paddingHorizontal: 15,
                  marginHorizontal: 20,
                  borderColor: theme.colors.list_bg,
                  alignItems: 'center',
                  flexDirection: 'row',
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
                  Font Size
                </TextFormated>
                <TextFormated
                  style={{
                    fontWeight: '700',
                    color:
                      Selected_theme == 'Dark'
                        ? theme.colors.Light_Gray
                        : theme.light_colors.White,
                  }}>
                  {item.id}
                </TextFormated>
              </TouchableOpacity>
            )}
          />
        </View>
        <View
          style={{
            flex: 1,
            // width: Dimensions.get('window').width - 40,
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            data={DATA}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  marginVertical: 18,
                  backgroundColor:
                    Selected_theme == 'Dark'
                      ? theme.colors.Background
                      : theme.light_colors.Background,
                  paddingVertical: 25,
                  paddingHorizontal: 35,
                  marginHorizontal: 30,
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: theme.colors.list_bg,
                  alignItems: 'center',
                }}>
                <TextFormated
                  style={{
                    fontWeight: '700',
                    color:
                      Selected_theme == 'Dark'
                        ? theme.colors.Light_Gray
                        : theme.light_colors.White,
                  }}>
                  Font- {item.id}
                </TextFormated>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}
