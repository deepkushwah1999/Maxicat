
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet, Image,
    Text, 
    View, 
    ActivityIndicator
  } from 'react-native';
import React from 'react';

export const Loader = (props) => props.loading?(
    <View style={{
        justifyContent: 'center', alignItems: 'center', position: 'absolute',
        left: 0,
        right: 0,
        opacity: 0.1,
        backgroundColor: 'black',
        top: 0,
        bottom: 0,
    }}>
        <ActivityIndicator size="small" color={'white'}/>
    </View>
):(<View>

</View>)
