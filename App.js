import React from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import TextFormatted from './src/Components/TextFormated';
import AppNavigator from './src/Navigation/Root';
import store, {persistor} from './src/redux/store';
import {theme} from './src/Utils/theme';

export default function App() {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;
  Text.defaultProps.style = Text.defaultProps.style || {};
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <PaperProvider theme={theme}>
          <View style={{flex: 1}}>
            <AppNavigator />
          </View>
          <Toast
            visibilityTime={1500}
            autoHide={true}
            config={{
              success: props => (
                <View
                  style={[styles.toastContainer, {backgroundColor: '#247a17'}]}>
                  <TextFormatted style={styles.toastText}>
                    {props.text1}
                  </TextFormatted>
                </View>
              ),
              error: props => (
                <View
                  style={[
                    styles.toastContainer,
                    {backgroundColor: theme.colors.error},
                  ]}>
                  <TextFormatted style={styles.toastText}>
                    {props.text1}
                  </TextFormatted>
                </View>
              ),
            }}
          />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    width: Dimensions.get('window').width - 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  toastText: {color: 'white', fontWeight: '500'},
});
