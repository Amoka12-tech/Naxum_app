import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../styles'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { grey, primary, red, white } from '../../assets/colors'
import { useDispatch, useSelector } from 'react-redux'
import { update_user } from '../../reducers/auth'
import { show } from '../../reducers/message'
import { create_user_contact, delete_user_contact, edit_user_contact } from '../../actions/private'
import { useFocusEffect } from '@react-navigation/native'

const user_image = require('../../assets/images/user.jpg');

const ContactScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const contact = route.params?.contact;

  const [firstname, setFirstname] = useState(contact? contact.firstname : null);
  const [firstnameError, setFirstnameError] = useState(null);
  const [lastname, setLastname] = useState(contact? contact.lastname : null);
  const [lastnameError, setLastnameError] = useState(null);
  const [phone, setPhone] = useState(contact? contact.phone : null);
  const [phoneError, setPhoneError] = useState(null);
  const [email, setEmail] = useState(contact? contact.email : null);
  const [emailError, setEmailError] = useState(null);

  const [proceessing, setProcessing] = useState(false);


  const payload = {
    firstname: `${firstname}`,
    lastname: `${lastname}`,
    email: `${email}`,
    phone: `${phone}`,
  };

  const message = {
    type: null,
    message: null,
  };

  const submit = () => {
    //check if details in params do update or create
    !contact ? 
      create_user_contact(payload, dispatch, setProcessing, navigation) 
      : edit_user_contact(contact, payload, dispatch, setProcessing);
  }

  const delete_ = () => {
    delete_user_contact(contact, dispatch, setProcessing, navigation);
  };

  useEffect(() => {
    if(contact) {
      console.log('found');
      setFirstname(contact?.firstname);
      setLastname(contact?.lastname);
      setEmail(contact?.email);
      setPhone(contact?.phone);
    } else {
      console.log('not found');
      setFirstname(null);
      setLastname(null);
      setEmail(null);
      setPhone(null);
    }
  }, [contact]);


  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: white, }}>
      <View style={styles.top_nav_holder}>
        <AntDesign onPress={() => navigation.goBack()} name='left' size={24} color={grey} />
        <Text style={styles.top_nav_title}>{contact ? 'Contact details': 'Create contact'}</Text>
        <AntDesign onPress={submit} name='check' size={24} color={grey} />
      </View>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.main_nav_view, { paddingLeft: 0, paddingRight: 0, minHeight: 0, width: '100%' }]}>

          {proceessing && <ActivityIndicator size={'large'} color={primary} style={{ alignSelf: 'center' }} />}

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
            <Text style={[styles.login_button_text]}>{contact ? 'Update' : 'Create'}</Text>
          </TouchableOpacity>

          {contact && <TouchableOpacity onPress={delete_} style={[styles.login_button, { marginBottom: 30, backgroundColor: red, }]}>
            <Text style={[styles.login_button_text]}>{'Delete'}</Text>
          </TouchableOpacity>}
        </View>
      </ScrollView>
    </View>
  )
}

export default ContactScreen