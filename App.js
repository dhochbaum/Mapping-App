import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GetCurrentLocation from './components/GetCurrentLocation'
import Map from './components/Map'
import NavBar from './components/NavBar'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import * as Permissions from 'expo-permissions';
import Location from 'expo-permissions'
import { Provider } from "react-redux";
import store from "./components/store";



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
    <Provider store={store}>

      <View style={styles.container}>
      {/* <Text>a</Text> */}
      
        <Map />
      {/* <NavBar /> */}

      </View>
    </Provider>
  );
}


