import React, { useState, useEffect } from 'react'
import Geolocation from '@react-native-community/geolocation';


export const useLocation = () => {

    const [hasLocation, setHasLocation] = useState(false);
    const [initialPosition, setInitialPosition] = useState({ latitude: 0, longitud: 0});

    useEffect(() => {
        Geolocation.getCurrentPosition(
            ({ coords }) => {
                setInitialPosition({
                    latitude: coords.latitude,
                    longitud: coords.longitude
                });

                setHasLocation(true);
            },
            (err) => console.log(err),
            {
                enableHighAccuracy: true
            }
        );
    }, [])
  return {
    hasLocation,
    initialPosition
  }
}