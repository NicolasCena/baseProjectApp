import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  locationStatus: 'unavailable',
}

export const permissionsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    askLocationPermission: () => {
    },
    checkLocationPermission: () => {
    },
  },
})

// Action creators are generated for each case reducer function
export const { askLocationPermission, checkLocationPermission } = permissionsSlice.actions

export default permissionsSlice.reducer