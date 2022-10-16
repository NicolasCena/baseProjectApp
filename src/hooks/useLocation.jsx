import { useState, useEffect, useRef } from 'react'
import Geolocation from '@react-native-community/geolocation';


export const useLocation = () => {

    const [ hasLocation, setHasLocation ] = useState(false);
    const [ initialPosition, setInitialPosition ] = useState({ latitude: 0, longitude: 0});
    const [ userLocation, setUserLocation ] = useState({ latitude: 0, longitude: 0 });
    const [ routeLines, setRouteLines ] = useState([])

    const watchId = useRef();
    const isMounted = useRef(true);

    // Si cambia algun permiso, detenemos el seguimiento para evitar errores
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    }, [])


    useEffect(() => {

        getCurrentLocation()
            .then( location => {

                if( !isMounted.current ) return;

                setInitialPosition(location);
                setUserLocation(location);
                setRouteLines( routes => [ ...routes, location ])
                setHasLocation(true);
            });

    }, []);


    // Funcion para obtener las coordenadas del usuario
    const getCurrentLocation = () => {
        return new Promise( (resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({ coords }) => {
                    
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });
    
                },
                (err) => reject({ err }), { enableHighAccuracy: true }
            );
        });
    }
    // Funcion para hacer el seguimiento del usuario
    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(
            ({ coords }) => {

                if( !isMounted.current ) return;


                const location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }

                setUserLocation( location );
                setRouteLines( routes => [ ...routes, location ]);

            },
            (err) => console.log(err), { enableHighAccuracy: true, distanceFilter: 10 }
        );
    }

    const stopFollowUserLocation = () => {
        if( watchId.current )
            Geolocation.clearWatch( watchId.current );
    }


  return {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
    userLocation,
    routeLines
  }
}