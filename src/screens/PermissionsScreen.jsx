import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {  askLocationPermission, checkLocationPermission, changeControl } from '../context/permissionsSlice';

export const PermissionsScreen = () => {

  const [ flag, setFlag ]= useState(true)

  const state = useSelector((state) => state.permissions);
  const dispatch = useDispatch()

  return (
    <View style={ style.container }>
      <Text style={ style.colorText }>PermissionsScreen</Text>

      <Button 
        title='Checkeo'
        onPress={ () => dispatch(checkLocationPermission()) }
      />

      <Button 
        title='Status' 
        onPress={ () => dispatch(askLocationPermission()) }
      />

    {/* <Button 
        title='Preguntar'
        onPress={ () => {dispatch(changeControl(flag)), setFlag(!flag)} }
      /> */}

      <Text>
        { JSON.stringify( state, null, 2 )}
      </Text>

    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})