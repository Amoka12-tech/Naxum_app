import { View, Text, Alert, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useDispatch, useSelector } from 'react-redux';
import LoginScreen from './auth/LoginScreen';
import HomeScreen from './private/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageModal from '../components/MessageModal';
import * as SecureStore from 'expo-secure-store';
import {authenticate, initLogout, logOut} from '../reducers/auth';
import { primary } from '../assets/colors';
import { logout_user } from '../actions/auth';
import styles from './styles';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isLoggedIn);
    const isLoading = useSelector(state => state.auth.isLoading);
    const isLogout = useSelector(state => state.auth.initLogout);
    const message = useSelector(state => state.message);

    const [proceessing, setProcessing] = useState(false);
    const [screenWait, setScreenWait] = useState(true);

    const getLocalUserData = async () => {
        try {
            const user = await SecureStore.getItemAsync('_user');
            return user;
        } catch (error) {
            return null;
        }
    };
    
    useEffect(() => {
        async function check_storage(){
            const data = await getLocalUserData();
            if (data) {
                const jsonData = JSON.parse(data);
                // console.log('data',jsonData);
                dispatch(authenticate(jsonData));
            } else {
                dispatch(logOut());
            }
            setScreenWait(false);
        }
        check_storage();
    }, []);
    // console.log(message.message);


    const LogoutModal = () => (
        <View style={[styles.confirm_modal, { zIndex: 10, }]}>
          <Text style={styles.confirm_message_text}>Proceed Sign-out?</Text>
    
          <View style={styles.confirm_button_holder}>
            <TouchableOpacity onPress={() => logout_user(setProcessing, dispatch)} style={styles.confirm_button}>
              <Text style={styles.login_button_text}>Yes</Text>
            </TouchableOpacity>
    
            <TouchableOpacity onPress={() => dispatch(initLogout(false))} style={styles.confirm_button}>
              <Text style={styles.login_button_text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      );

    
  return !screenWait ? (
    <NavigationContainer>
    {(isLoading || proceessing) && <ActivityIndicator size={'small'} color={primary} />}
    {message.message !== null && <MessageModal />}
    {isLogout && <LogoutModal />}
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <Stack.Screen name='Home' component={HomeScreen} />
            ) : (
                <Stack.Screen name='Login' component={LoginScreen} />
            )}
        </Stack.Navigator>
    </NavigationContainer>
  ) : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={styles.loading_text}>Loading...</Text>
  </View>
}

export default MainStack