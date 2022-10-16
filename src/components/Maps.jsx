import { useState, useEffect, useRef } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet } from 'react-native'
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Fab } from './Fab';

export const Maps = () => {

    const [ showPolyline, setShowPolyline ] = useState(true);

    const { hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
        routeLines } = useLocation();

    const mapViewRef = useRef();
    const following  = useRef(true);

    // Actualizamos el seguimiento al usuario
    useEffect(() => {
        followUserLocation();
        return () => {
            stopFollowUserLocation();
        }
    }, [])

    useEffect(() => {

        if( !following.current ) return;

        const { latitude, longitude } = userLocation;
        mapViewRef.current?.animateCamera({
            center: { latitude, longitude }
        });
    }, [ userLocation ])
    

    // Funcion para llevar al usuario al centro de su ubicacion
    const centerPosition = async() => {

        const { latitude, longitude } = await getCurrentLocation();
        
        following.current = true;

        mapViewRef.current?.animateCamera({
            center: { latitude, longitude }
        });
    }
    if(!hasLocation){
        return <LoadingScreen />
    };

  return (
    <>
        <MapView
            ref={ (el) => mapViewRef.current = el }
            // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
            latitude: initialPosition.latitude,
            longitude: initialPosition.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
            }}
            showsUserLocation={true}
        >

            {
                showPolyline && (
                    <Polyline 
                        coordinates={ routeLines }
                        strokeColor="black"
                        strokeWidth={ 3 }
                    />
                )
            }

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
                left: 15
            }}
        />

        <Fab 
            iconName="brush-outline"
            onPress={ () => setShowPolyline( !showPolyline ) }
            style={{
                position: 'absolute',
                bottom: 20,
                right: 20
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