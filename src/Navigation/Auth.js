import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from '../Screens/Auth/Signup';
import Login from '../Screens/Auth/Login';
import Home from '../Screens/Home/Home';
import Setpassword from '../Screens/Auth/Setpassword';
import Chat from '../Screens/Home/Chat';
import Settings from '../Screens/Home/Settings';
import UpdateUserInfo from '../Screens/Home/UdateUserInfo';
import CreateGroup from '../Screens/Home/CreateGroup';
import OurProjects from '../Screens/Home/OurProjects';
import SelectUser from '../Screens/Home/SelectUser';
import RemoveUser from '../Screens/Home/RemoveUser';
import Wallpaper from '../Screens/Home/Wallpaper';
import Font from '../Screens/Home/Font';
import AllUsers from '../Screens/Home/AllUsers';
import {useSelector, useDispatch} from 'react-redux';
import EnterPassword from '../Screens/Auth/EnterPassword';
import ChangePassword from '../Screens/Home/ChangePassword';
import UserProfile from '../Screens/Home/UserProfile';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  // const token = useSelector(selectCount)
  // const isLoggedIn = useSelector(state => false);
  const isLoggedIn = useSelector(state => {
    console.log('state--->', state.auth);
    return state.auth.token && state.auth.token !== '';
  });
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Signup">
      {!isLoggedIn && (
        <>
          <Stack.Screen component={Signup} name="Signup" />
          <Stack.Screen component={Login} name="Login" />
          <Stack.Screen component={Setpassword} name="Setpassword" />
          <Stack.Screen component={EnterPassword} name="EnterPassword" />
        </>
      )}
      {isLoggedIn && (
        <>
          <Stack.Screen component={Home} name="Home" />
          <Stack.Screen component={Chat} name="Chat" />
          <Stack.Screen component={Settings} name="Settings" />
          <Stack.Screen component={UpdateUserInfo} name="UpdateUserInfo" />
          <Stack.Screen component={ChangePassword} name="ChangePassword" />
          <Stack.Screen component={UserProfile} name="UserProfile" />
          <Stack.Screen component={CreateGroup} name="CreateGroup" />
          <Stack.Screen component={OurProjects} name="OurProjects" />
          <Stack.Screen component={SelectUser} name="SelectUser" />
          <Stack.Screen component={RemoveUser} name="RemoveUser" />
          <Stack.Screen component={Wallpaper} name="Wallpaper" />
          <Stack.Screen component={Font} name="Font" />
          <Stack.Screen component={AllUsers} name="AllUsers" />
        </>
      )}
    </Stack.Navigator>
  );
}
