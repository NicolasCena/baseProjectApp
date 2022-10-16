import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';

export const Fab = ({ iconName, onPress, style = {} }) => {
  
    return (
        <View style={{ ...style }}>
            <TouchableOpacity
                activeOpacity={ 0.8 }
                onPress={ onPress }
                style={ styles.blackButton }
            >
                <Icon 
                    name={ iconName }
                    color="white"
                    size={ 35 }
                />

            </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
    blackButton: {
        zIndex: 9999,
        backgroundColor: 'black',
        width: 50,
        height: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    }
})