// import React from 'react';
// import {
//   View,
//   Image,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   ImageBackground,
// } from 'react-native';
// import {theme} from '../Utils/theme';
// import TextFormatted from './TextFormated';

// export default function SelectLanguage({
//   text,
//   image,
//   online_status,
//   onPress,
//   width,
//   location,
//   source,
// }) {
//   return (
//     <TouchableOpacity
//       style={{
//         marginTop: 20,
//         backgroundColor: theme.colors.primary,
//         borderRadius: 20,
//         // borderWidth: 2,
//         width: Dimensions.get('window').width / 2.3,
//         height: Dimensions.get('window').width / 2,
//         // flexDirection: 'row',
//         marginHorizontal: 10,
//         overflow: 'hidden',
//         alignItems: 'center',
//       }}
//       onPress={onPress}>
//       <ImageBackground
//         style={{
//           width: Dimensions.get('window').width / 2.3,
//           height: Dimensions.get('window').width / 2,
//           borderRadius: 20,
//           backgroundColor: theme.colors.C4C4C4,
//         }}
//         imageStyle={{
//           width: Dimensions.get('window').width / 2.3,
//           height: Dimensions.get('window').width / 2,
//           resizeMode: 'cover',
//           borderRadius: 20,
//         }}
//         source={source}>
//         {/* source={{uri: 'https://picsum.photos/200'}}> */}
//         {online_status == 'ONLINE' ? (
//           <Image
//             style={{
//               height: 15,
//               width: 15,
//               position: 'absolute',
//               right: 10,
//               top: 10,
//             }}
//             source={require('../Assets/icons/onlineicon.png')}
//           />
//         ) : (
//           <View />
//         )}
//         <View
//           style={{
//             position: 'absolute',
//             bottom: 10,
//             left: 10,
//             // width: '70%',
//           }}>
//           <TextFormatted
//             style={{
//               fontSize: 15,
//               color: theme.colors.primary,
//               fontWeight: '600',
//             }}>
//             {text}
//           </TextFormatted>

//           <TextFormatted
//             numberOfLine={1}
//             style={{
//               fontSize: 12,
//               color: theme.colors.primary,
//               fontWeight: '600',
//             }}>
//             {location}
//           </TextFormatted>
//         </View>
//       </ImageBackground>
//     </TouchableOpacity>
//   );
// }
