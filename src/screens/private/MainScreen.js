import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../styles'
import { useDispatch, useSelector } from 'react-redux'
import { useDrawerStatus } from '@react-navigation/drawer'
import { toggleDrawer } from '../../reducers/drawer'
import { AntDesign, EvilIcons, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons'
import { grey, primary, white } from '../../assets/colors'
import SingleContact from '../../components/SingleContact'

const MainScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector(state => state.drawer.open);
    const contacts = useSelector(state => state.contacts.contacts);

    const drawerStatus =  useDrawerStatus()

    useEffect(() => {
        if(drawerStatus === 'closed') {
            dispatch(toggleDrawer(false))
        }
    }, [drawerStatus]);

    useEffect(() => {
        isDrawerOpen && navigation.openDrawer(true);
    }, [isDrawerOpen]);

    const [search, setSearch] = useState(null);

    const refresh_contacts = () => {
      return null;
    };
  return (
    <View style={{ flex: 1, }}>
      <ScrollView contentContainerStyle={styles.main_nav_view}>
        <View style={styles.title_holder}>
          <Text style={styles.title_text}>Add Contacts</Text>
        </View>

        <View style={styles.action_button_holder}>
          <View style={styles.circl_box_holder}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Contact')} 
              style={styles.circle_box}>
                <MaterialCommunityIcons name='plus-box-multiple-outline' color={white} size={35} />
            </TouchableOpacity>
            <Text style={styles.circl_box_text}>New</Text>
          </View> 
          {/* Add contact button */}

          <View style={styles.circl_box_holder}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Contact')}
              style={styles.circle_box}>
                <AntDesign name='contacts' color={white} size={35} />
            </TouchableOpacity>
            <Text style={styles.circl_box_text}>Phone Book</Text>
          </View>
          {/* Add phone book */}

          <View style={styles.circl_box_holder}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Contact')}
              style={styles.circle_box}>
                <EvilIcons name='envelope' color={white} size={55} />
            </TouchableOpacity>
            <Text style={styles.circl_box_text}>Email</Text>
          </View>
          {/* Add Email */}
        </View>

        <View style={[styles.divider, { marginTop: 40, width: '100%', }]} />

        <View style={styles.full_column_view}>
          <TextInput 
            placeholder='Search Contact'
            value={search}
            onChangeText={e => setSearch(e)}
            style={[styles.login_input, { borderWidth: 1, padding: 10, fontSize: 16, borderRadius: 6, borderColor: grey, width: '80%', height: 35, }]} />

          <TouchableOpacity style={[styles.login_button, { width: '80%', height: 35, marginTop: 10, }]}>
            <Text style={[styles.login_button_text]}>Search</Text>
          </TouchableOpacity>
        </View>

        {contacts?.map((contact, index) => <SingleContact key={index.toString()} contact={contact} navigation={navigation} />)}

      </ScrollView>

      <View style={styles.bottom_box}>
        <TouchableOpacity onPress={refresh_contacts} style={styles.column_holder}>
          <View style={styles.bottom_box_cirlce}>
            <AntDesign name='user' size={30} color={primary} />
            <Fontisto 
              name='spinner-refresh' 
              size={12} 
              color={primary}
              style={{
                position: 'absolute',
                right: 8,
                bottom: 5,
              }} />
          </View>
          <Text style={styles.refresh_text}>Refresh Contacts</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MainScreen