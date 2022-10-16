import { useRef } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet } from 'react-native'
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Fab } from './Fab';

export const Maps = () => {

    const { hasLocation, initialPosition, getCurrentLocation } = useLocation();
    const mapViewRef = useRef();
    
    if(!hasLocation){
        return <LoadingScreen />
    };

    const centerPosition = async () => {

        const { latitude, longitude } = await getCurrentLocation();

        mapViewRef.current?.animateCamera({
            center: { latitude, longitude },
        })
    }

  return (
    <>
        <MapView
            ref={ (el) => mapViewRef.current = el }
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
            latitude: initialPosition.latitude,
            longitude: initialPosition.longitud,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
            }}
            showsUserLocation={true}
        >

            {/* Permite añadirle caracteristicas al icono del usuario y su seguimiento */}
            {/* <Marker 
                // image={require('../assets/custom-marker.png')}
                coordinate={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                }}
                title="Esto es un titulo"
                description="Esto es una descripcion"
            /> */}

        </MapView>

        <Fab 
            iconName="compass-outline"
            onPress={ centerPosition }
            style={{
                position:'absolute',
                bottom: 20,
                right: 20,
                left: 15
            }}
        />
    </>
  )
}

const styles = StyleSheet.create({
    map: {
      flex: 1
    },
});