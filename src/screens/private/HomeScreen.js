import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createDrawerNavigator, useDrawerStatus } from '@react-navigation/drawer'
import ProfileScreen from './ProfileScreen';
import ContactScreen from './ContactScreen';
import MainScreen from './MainScreen';
import DrawerContent from '../../components/DrawerContent';
import { black, primary, white } from '../../assets/colors';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../../reducers/drawer';
import { get_user_profile } from '../../actions/auth';

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleDrawer(true))
  };

  useEffect(() => {
    get_user_profile();
  }, []);
  
  return (
    <Drawer.Navigator 
      initialRouteName='Main' 
      drawerContent={(props) => <DrawerContent {...props} />} 
      screenOptions={{ 
        headerTitleStyle: { display: 'none', }, 
        headerStyle: {backgroundColor: primary},
        headerTintColor: white,
        drawerPosition: 'right',
        headerLeft: () => null,
        headerRight: (props) => <Ionicons onPress={toggle} name='menu' color={white} size={30} style={{ marginRight: 10, zIndex: 10, }}/>,

        }}>
        <Drawer.Screen name='Main' component={MainScreen} />
        <Drawer.Screen name='Contact' options={{ headerShown: false }} component={ContactScreen} />
        <Drawer.Screen name='Profile' options={{ headerShown: false }} component={ProfileScreen} />
    </Drawer.Navigator>
  )
}

export default HomeScreen