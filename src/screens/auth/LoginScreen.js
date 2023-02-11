import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import styles from '../styles';
import { darkgrey, grey, primary } from '../../assets/colors';
import { show } from '../../reducers/message';
import { useDispatch } from 'react-redux';
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { authenticate } from '../../reducers/auth';
import { login_user } from '../../actions/auth';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [usernameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [proceessing, setProcessing] = useState(false);

  const login = () => {
    if(!username){
      setUserNameError(true);
    }else if(!password){
      setPasswordError(true);
    }else if(!username && !password) {
      setUserNameError(true);
      setPasswordError(true);
    } else {
      const data = {
        username: username,
        password: password,
      };
      login_user(data, dispatch, setProcessing);
    };
  };

  return (
    <View style={styles.main_view}>
      {proceessing && <ActivityIndicator size={'small'} color={primary} />}
      <View 
        style={{ 
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
           }}>
        <Ionicons name='person' size={20} color={grey} style={{ position: 'absolute', top: 30, left: 0 }} />
        <TextInput 
          value={username}
          onChangeText={e => setUserName(e)}
          onFocus={() => setUserNameError(null)}
          placeholder={'Username'}
          placeholderTextColor={primary}
          inputMode={'text'}
          blurOnSubmit={true}
          style={[styles.login_input, { paddingLeft: 30, }]} />
      </View>
      {usernameError && <Text style={styles.login_input_error}>Username field can't be empyt</Text>}


      <View style={{ 
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
           }}>
            <MaterialCommunityIcons name='lock' size={20} color={grey} style={{ position: 'absolute', top: 30, left: 0 }} />
            <TextInput 
              value={password}
              onChangeText={e => setPassword(e)}
              onFocus={() => setPasswordError(null)}
              placeholder={'Password'}
              secureTextEntry={true}
              placeholderTextColor={primary}
              style={[styles.login_input, { paddingLeft: 30, }]} />
           </View>
      {passwordError && <Text style={styles.login_input_error}>Password field can't be empyt</Text>}

        <TouchableOpacity onPress={() => login()} style={styles.login_button}>
          <Text style={styles.login_button_text}>LOGIN</Text>
        </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;