import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { MapScreen } from '../screens/MapScreen';
import { PermissionsScreen } from '../screens/PermissionsScreen';
import { AppState } from 'react-native';
import { checkLocationPermission } from '../context/permissionsSlice'
import { useSelector, useDispatch } from 'react-redux';
import { LoadingScreen } from '../screens/LoadingScreen';

const Stack = createStackNavigator();

export const Navigation = () => {

  const dispatch = useDispatch()
  const estadoPermiso = useSelector( state => state.permissions.locationStatus);
  

    useEffect(() => {
      
      dispatch(checkLocationPermission());

      AppState.addEventListener('change', state => {
          
          if( state !== 'active' ) return;

          dispatch(checkLocationPermission());
      });

  }, [])

  if ( estadoPermiso === 'unavailable' ) {

    return <LoadingScreen />
  }


  return (
    <Stack.Navigator
      initialRouteName='PermissionsScreen'
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      {
        estadoPermiso === 'granted'
        ? <Stack.Screen name="MapScreen" component={MapScreen} />
        : <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      }

    </Stack.Navigator>
  );
}