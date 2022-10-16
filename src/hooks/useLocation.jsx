import { useState, useEffect } from 'react'
import Geolocation from '@react-native-community/geolocation';


export const useLocation = () => {

    const [hasLocation, setHasLocation] = useState(false);
    const [initialPosition, setInitialPosition] = useState({ latitude: 0, longitude: 0});

    useEffect(() => {
        getCurrentLocation()
            .then( location => {
                setInitialPosition(location);
                setHasLocation(true);
            })
    }, [])

    const getCurrentLocation = () => {

        return new Promise(( resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({ coords }) => {

                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });
    
                    setHasLocation(true);
                },
                (err) => reject({ err }), { enableHighAccuracy: true }
            );
        })
    }


  return {
    hasLocation,
    initialPosition,
    getCurrentLocation
  }
}