import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import styles from '../screens/styles';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { black, primary } from '../assets/colors';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { logout_user } from '../actions/auth';
import { useDispatch } from 'react-redux';
import { initLogout } from '../reducers/auth';

const user_image = require('../assets/images/user.jpg');

const DrawerContent = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  // console.log('State: ', navigation.getState().index);
  const navState = navigation.getState().index;

  const [openDropDown, setOpenDropDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const call_logout = () => {
    dispatch(initLogout(true));
  };


  return (
    <DrawerContentScrollView {...props} >
      {isLoading && <ActivityIndicator size={'small'} color={primary} />}
      <View style={styles.drawer_profile_holder}>
        <Image source={user_image} style={styles.profile_picture}/>
      </View>
      <View style={styles.divider} />

      <View style={styles.links_view}>
        <TouchableOpacity 
          onPress={() => setOpenDropDown(!openDropDown)}
          style={[styles.link_holder, { justifyContent: 'space-between' }]}>
          <View style={[styles.first_link, { width: '70%' }]}>
            <MaterialCommunityIcons 
              name='lock' 
              size={20} 
              color={navState === 0 ? primary : black} 
              style={{ marginRight: 20 }} />
            <Text style={[styles.link_text , {color: navState === 0 ? primary : black }]}>Profile</Text>
          </View>
          <AntDesign name={openDropDown ? 'up' : 'down'} color={black} size={16} />
        </TouchableOpacity>

        {openDropDown && <TouchableOpacity 
          style={[styles.link_holder, { justifyContent: 'flex-start', paddingLeft: '10%', }]}
          onPress={() => navigation.navigate('Profile')}
          >
            <AntDesign name='appstore1' color={black} size={12} />
            <Text style={styles.link_text}> My Profile</Text>
        </TouchableOpacity>}

        <TouchableOpacity 
          onPress={call_logout}
          style={[styles.link_holder, { justifyContent: 'flex-start', marginTop: 10,}]}>
          <AntDesign name='poweroff' size={16} color={navState === 1 ? primary : black} style={{ marginRight: 20 }} />
          <Text style={styles.link_text}>Logout</Text>
        </TouchableOpacity>
      </View>
      
    </DrawerContentScrollView>
  )
}

export default DrawerContent