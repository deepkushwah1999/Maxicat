import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import AuthNavigation from './Auth';
import Config from '../Utils/Config'
// import Api from "@services/api";

export default function AppNavigator() {
  // Api.init({
  //   url: Config.baseUrl,
  // });
  // Api.setClientToken("");


  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
}
