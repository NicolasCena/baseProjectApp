import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Maps } from '../components/Maps';


export const MapScreen = () => {

  return (
    <View style={styles.container}>
      <Maps />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
 });