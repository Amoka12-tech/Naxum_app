import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import styles from '../styles'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { grey, primary, white } from '../../assets/colors'
import { useDispatch, useSelector } from 'react-redux'
import { update_user } from '../../reducers/auth'
import { show } from '../../reducers/message'
import { update_user_profile } from '../../actions/auth'

const user_image = require('../../assets/images/user.jpg');

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const [firstname, setFirstname] = useState(user? user?.name?.split(" ", 2)[0] : null);
  const [firstnameError, setFirstnameError] = useState(false);
  const [lastname, setLastname] = useState(user? user?.name?.replace(`${user?.name?.split(" ", 2)[0]} `, "") : null);
  const [lastnameError, setLastnameError] = useState(false);
  const [phone, setPhone] = useState(user? user?.phone : null);
  const [phoneError, setPhoneError] = useState(false);
  const [email, setEmail] = useState(user? user?.email : null);
  const [emailError, setEmailError] = useState(false);

  const [proceessing, setProcessing] = useState(false);

  const payload = {
    name: `${firstname} ${lastname}`,
    email: `${email}`,
    phone: `${phone}`,
  };

  const message = {
    type: null,
    message: null,
  };

  const submit = () => {
    if (!firstname)
      setFirstnameError(true);
    if (!lastname)
      setLastnameError(true);
    if (!email)
      setEmailError(true);
    if (!phone)
      setPhoneError(true);
    if(firstname && lastname && email && phone) {
      update_user_profile(payload, dispatch, setProcessing);
    };
  }


  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: white, }}>
      {proceessing && <ActivityIndicator size={'small'} color={primary} />}
      <View style={styles.top_nav_holder}>
        <AntDesign onPress={() => navigation.goBack()} name='left' size={24} color={grey} />
        <Text style={styles.top_nav_title}>Profile</Text>
        <View />
      </View>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.main_nav_view, { paddingLeft: 0, paddingRight: 0, minHeight: 0, width: '100%' }]}>
        <View style={styles.image_box_holder}>
          <Image source={user_image} style={styles.profile_page_picture} />
          <MaterialCommunityIcons 
            name='pencil-circle' 
            color={grey} 
            size={50}
            style={{
              position: 'absolute',
              top: 105,
              right: 90,
            }} />
        </View>

        <TouchableOpacity style={[styles.login_button,]}>
          <Text style={[styles.login_button_text]}>Top bages</Text>
        </TouchableOpacity>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', marginBottom: 10, }}>
          <TouchableOpacity style={[styles.login_button, { height: 55, borderWidth: 1, borderColor: primary, width: '33%', borderTopEndRadius: 0, borderBottomEndRadius: 0, }]}>
            <Text style={[styles.login_button_text]}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.login_button, { height: 55, borderWidth: 1, borderColor: primary, backgroundColor: white, borderRadius: 0, width: '33%', }]}>
            <Text style={[styles.login_button_text, { color: primary }]}>Social</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.login_button, { height: 55, borderWidth: 1, borderColor: primary, backgroundColor: white, width: '33%', borderTopStartRadius: 0, borderBottomStartRadius: 0,  }]}>
            <Text style={[styles.login_button_text, { color: primary }]}>Links</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.column_holder, { width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', }]}>
          <TextInput 
              value={firstname}
              onChangeText={e => setFirstname(e)}
              onFocus={() => setFirstnameError(null)}
              placeholder={'First Name'}
              placeholderTextColor={grey}
              style={[styles.login_input]} />
          {firstnameError && <Text style={styles.login_input_error}>is required</Text>}

          <TextInput 
              value={lastname}
              onChangeText={e => setLastname(e)}
              onFocus={() => setLastnameError(null)}
              placeholder={'Last Name'}
              placeholderTextColor={grey}
              style={[styles.login_input]} />
          {lastnameError && <Text style={styles.login_input_error}>is required</Text>}

          <TextInput 
              value={phone}
              onChangeText={e => setPhone(e)}
              onFocus={() => setPhoneError(null)}
              keyboardType={'phone-pad'}
              placeholder={'Mobile Number'}
              placeholderTextColor={grey}
              style={[styles.login_input]} />
          {phoneError && <Text style={styles.login_input_error}>is required</Text>}

          <TextInput 
              value={email}
              onChangeText={e => setEmail(e)}
              onFocus={() => setEmailError(null)}
              placeholder={'Email'}
              textContentType={'emailAddress'}
              placeholderTextColor={grey}
              style={[styles.login_input]} />
          {emailError && <Text style={styles.login_input_error}>is required</Text>}

          <TouchableOpacity onPress={submit} style={[styles.login_button, { marginBottom: 30, }]}>
            <Text style={[styles.login_button_text]}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default ProfileScreen