import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from '../styles';
import { darkgrey, grey, primary } from '../../assets/colors';
import { show } from '../../reducers/message';
import { useDispatch } from 'react-redux';
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { authenticate } from '../../reducers/auth';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [usernameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [isLogout, setIsLogout] = useState(false);

  const login = () => {
    const data = {
      username: username,
      password: password,
    };
    // if(!username)
    //   setUserNameError(true);
    // if(!password)
    //   setPasswordError(true);
    if(username && password) {
      setIsLogout(true);
    }
    const message = {
      type: 'failed', //['failed' | 'success']
      message: "Authentication failed!"
    };
    // dispatch(show(message));

    const payloadData = {
      user: {name: "Amoka Abdulmutalib", phone: "+2348034329120"},
      token: "hbds6gdewhifew8woq|qe9"
    };
    dispatch(authenticate(payloadData))
  };

  const LogoutModal = () => (
    <View style={styles.confirm_modal}>
      <Text style={styles.confirm_message_text}>Proceed Sign-out?</Text>

      <View style={styles.confirm_button_holder}>
        <TouchableOpacity onPress={() => setIsLogout(false)} style={styles.confirm_button}>
          <Text style={styles.login_button_text}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsLogout(false)} style={styles.confirm_button}>
          <Text style={styles.login_button_text}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.main_view}>
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

        {isLogout && <LogoutModal />}
    </View>
  );
};

export default LoginScreen;