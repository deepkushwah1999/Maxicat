import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {ScaledSize} from 'react-native';
import {Dispatch} from 'redux';
import {theme} from './theme';
import icons from './icons';

export function showToast(
  msg: String,
  type?: String,
  otherProps?: Object,
): void;

interface AppHookReturn extends RouteProp<ParamListBase>, ScaledSize {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
  theme: typeof theme;
  sbw: (width: number) => React.ReactNode;
  sbh: (height: number) => React.ReactNode;
  dispatch: Dispatch<any>;
}

export function useAppHook(): AppHookReturn;
