import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { MapScreen } from '../screens/MapScreen';
import { PermissionsScreen } from '../screens/PermissionsScreen';
import { AppState } from 'react-native';
import { checkLocationPermission } from '../context/permissionsSlice'
import { useSelector, useDispatch } from 'react-redux';

const Stack = createStackNavigator();

export const Navigation = () => {
  const dispatch = useDispatch()

    useEffect(() => {
          
      AppState.addEventListener('change', state => {
          
          if( state !== 'active' ) return;

          dispatch(checkLocationPermission());
      });

  }, [])

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
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
    </Stack.Navigator>
  );
}