import React from 'react';
import { View, Text, StyleSheet, Platform, Button } from 'react-native';
import { check, PERMISSIONS, request } from 'react-native-permissions';
import { useSelector, useDispatch } from 'react-redux';
import { askLocationPermission, checkLocationPermission } from '../context/permissionsSlice';

export const PermissionsScreen = () => {

  const ete = useSelector((state) => state)
  console.log(ete)

  const checkLocationPermission = async () => {

    let permissionStatus;

    if(Platform.OS === 'ios'){
      permissionStatus = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE )
    }else {
      permissionStatus = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION )
    }
    console.log({ permissionStatus })

  };

  return (
    <View style={ style.container }>
      <Text style={ style.colorText }>PermissionsScreen</Text>

      <Button 
        title='Permiso'
        onPress={ checkLocationPermission}
      />

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