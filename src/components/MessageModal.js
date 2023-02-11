import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { show } from '../reducers/message';
import { black, lock_bg, primary, red, white } from '../assets/colors';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import fonts from '../assets/fonts';

const { width: screenWidth, height: screenHigth } = Dimensions.get('window');

const MessageModal = () => {
    const dispatch = useDispatch();
    const message = useSelector(state => state.message);
    const initialMessage = {
        type: null,
        message: null
    };

    const closeMessageBox = () => {
        dispatch(show(initialMessage));
    };
  return (
    <View style={styles.main_view}>
      <View style={styles.box}>
        <Ionicons 
            name={message?.messageType === 'failed' ? 'close-circle' : 'checkmark-circle'} 
            size={65} 
            color={message?.messageType === 'failed' ? red : primary} />

        <Text style={styles.box_text}>{message?.message}</Text>

        <TouchableOpacity style={styles.box_button} onPress={closeMessageBox}>
            <Text style={styles.box_button_text}>
                CANCEL
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    main_view: {
        display: 'flex',
        width: screenWidth,
        height: screenHigth,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
        backgroundColor: lock_bg,
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 220,
        elevation: 5,
        shadowColor: black,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: white,
        marginTop: screenHigth / 3.5,
    },
    box_text: {
        fontSize: 18,
        fontStyle: 'normal',
        fontFamily: fonts.Poppins_400Regular,
        color: black,
        marginTop: 10,
        letterSpacing: 1,
    },
    box_button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 45,
        borderRadius: 5,
        backgroundColor: primary,
        marginTop: 30,
    },
    box_button_text: {
        fontSize: 18,
        fontStyle: 'normal',
        fontFamily: fonts.Poppins_400Regular,
        textAlign: 'center',
        color: white,
        letterSpacing: 1,
    },
});

export default MessageModal