import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { black, grey } from '../assets/colors';
import fonts from '../assets/fonts';
import { AntDesign } from '@expo/vector-icons';

const user_image = require('../assets/images/user.jpg');


const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const SingleContact = ({contact, navigation}) => {
  return (
    <TouchableOpacity 
        onPress={() => navigation.navigate('Contact', { contact: contact })}
        style={styles.main_view}>
        <View style={styles.top_view}>
            <Image source={user_image} style={styles.top_view_picture} />

            <View style={styles.name_holder}>
                <Text style={styles.name_text}>{`${contact?.firstname} ${contact?.lastname}`}</Text>
                <AntDesign name='right' color={grey} size={16} />
            </View>
        </View>
        <View style={styles.divider} />
    </TouchableOpacity>
  )
}

export default SingleContact

const styles = StyleSheet.create({
    main_view: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        marginTop: 10,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: grey,
    },
    top_view: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 10,
    },
    top_view_picture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        resizeMode: 'contain',
    },
    name_holder: {
        width: '85%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginLeft: 10,
    },
    name_text: {
        fontSize: 16,
        fontFamily: fonts.Poppins_400Regular,
        fontStyle: 'normal',
        fontWeight: '400',
        flexWrap: 'wrap',
        color: black,
    },
});