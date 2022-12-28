import {DefaultTheme} from 'react-native-paper';

// export default function D() {
//   const Selected_theme = useSelector(state => state.auth.theme || 'Dark');
//   alert(JSON.stringify(Selected_theme));
//   return <View />;
// }

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    White: '#ffffff',
    Black: '#000000',
    Background: '#031319',
    Button: '#7daebf',
    inputbg: '#022836',
    Light_Gray: '#c4c4c4',
    inputbg2: '#323c41',
    MenuBg: '#202323',
    MyChatBg: '#4c595d',
    MsgBg: '#bdc1c2',
    Like: '#1deb5c',
    OtherText: '#808080',
    list_bg: '#27353b',
    searchbar: '#7676801F',
    online: '#42FFB4',
    Get_Verified: '#8FB61C',
    Placeholder: '#B5B5B5',
    error: '#EB5A5A',
  },
  light_colors: {
    ...DefaultTheme.colors,
    White: '#000',
    Black: '#fff',
    Background: '#cfcfcf',
    Button: '#7daebf',
    inputbg: '#022836',
    Light_Gray: '#202323',
    inputbg2: '#323c41',
    MenuBg: '#202323',
    MyChatBg: '#4c595d',
    MsgBg: '#bdc1c2',
    OtherText: '#808080',
    list_bg: '#27353b',
    searchbar: '#7676801F',
  },
  dark: true,
};
