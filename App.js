import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
import { black } from './src/assets/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import MainStack from './src/screens/MainStack';
import MessageModal from './src/components/MessageModal';

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return(
      <View style={styles.loading_screen}>
        <Text style={styles.title}>
          Naxum Contacts App
        </Text>
        <Text style={styles.loading_text}>
          Loading...
        </Text>
      </View>
    )
  } else {
    return (
      <Provider store={store}>
        <MainStack />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  loading_screen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'center',
    color: black,
  },
  loading_text: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    textAlign: 'center',
    color: black,
  },
});
