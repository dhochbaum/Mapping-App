import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GetCurrentLocation from './GetCurrentLocation'
import Map from './Map'
import NavBar from './NavBar'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import * as Permissions from 'expo-permissions';
import Location from 'expo-permissions'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // height: 400,
    // width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });
 
export default function App() {
  
  return (

    <View style={styles.container}>
      {/* <Text>a</Text> */}
      
      <Map />
      <NavBar />

  </View>

  );
}


