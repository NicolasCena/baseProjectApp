import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet } from 'react-native'
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';


export const Maps = () => {

    const { hasLocation, initialPosition} = useLocation();
    
    if(!hasLocation){
        return <LoadingScreen />
    };

  return (
    <>
        <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
            latitude: initialPosition.latitude,
            longitude: initialPosition.longitud,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
            }}
        >

            <Marker 
                // image={require('../assets/custom-marker.png')}
                showsUserLocation
                coordinate={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                }}
                title="Esto es un titulo"
                description="Esto es una descripcion"
            />

        </MapView>
    </>
  )
}

const styles = StyleSheet.create({
    map: {
      flex: 1
    },
});