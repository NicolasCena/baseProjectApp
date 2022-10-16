import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { check, PERMISSIONS, request, openSettings } from 'react-native-permissions';
import { Platform } from 'react-native';

const initialState = {
  locationStatus: 'unavailable',
  control: true
};


export const askLocationPermission = createAsyncThunk('context/askLocationPermission', async() => {
    let permissionStatus;

    if ( Platform.OS === 'ios' ) {
        permissionStatus = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
      } else {
        permissionStatus = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
      };
      
    return permissionStatus
})

export const checkLocationPermission = createAsyncThunk('context/checkLocationPermission', async () => {
    let permissionStatus;

    if ( Platform.OS === 'ios' ) {
      permissionStatus = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
    } else {
      permissionStatus = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
    };

    if( permissionStatus === 'blocked' || permissionStatus === 'denied'){
      openSettings();
    }

    return permissionStatus
  });

export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    changeControl: (state, action) => {
        return { ...state, control: action.payload }
    }
  },
  extraReducers: {
    [askLocationPermission.pending]: (state, action) => {
        state.locationStatus = action.payload
    },
    [askLocationPermission.fulfilled]: (state, action) => {
        state.locationStatus = action.payload
    },
    [askLocationPermission.rejected]: (state, action) => {
        state.locationStatus = action.payload
    },
    [checkLocationPermission.pending]: (state, action) => {
        state.locationStatus = action.payload
    },
    [checkLocationPermission.fulfilled]: (state, action) => {
        state.locationStatus = action.payload
    },
    [checkLocationPermission.rejected]: (state, action) => {
        state.locationStatus = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { changeControl } = permissionsSlice.actions

export default permissionsSlice.reducer