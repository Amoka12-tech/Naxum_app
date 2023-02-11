import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux';
import LoginScreen from './auth/LoginScreen';
import HomeScreen from './private/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageModal from '../components/MessageModal';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    const isAuthenticated = useSelector(state => state.auth.isLoggedIn);
    const message = useSelector(state => state.message);
    // useEffect(() => {
    //     if (!isAuthenticated) {} else {}
    // }, []);
    // console.log(message.message);

    
  return (
    <NavigationContainer>
    {message.message !== null && <MessageModal />}
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <Stack.Screen name='Home' component={HomeScreen} />
            ) : (
                <Stack.Screen name='Login' component={LoginScreen} />
            )}
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStack