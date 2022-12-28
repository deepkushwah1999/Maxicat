import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {theme} from './theme';

export const showToast = (msg, type = 'success', otherProps = {}) =>
  Toast.show({text1: msg, type, ...otherProps});

export function useAppHook() {
  const navigation = useNavigation();
  const route = useRoute();
  const dimensions = useWindowDimensions();
  const sbw = width => <View style={{width}} />;
  const sbh = height => <View style={{height}} />;
  const dispatch = useDispatch();

  return {navigation, ...route, ...dimensions, theme, sbw, sbh, dispatch};
}
