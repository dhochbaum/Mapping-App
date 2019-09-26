import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GetCurrentLocation from './GetCurrentLocation'
import Map from './Map'
import NavBar from './NavBar'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import * as Permissions from 'expo-permissions';
import Location from 'expo-permissions'


var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  console.log(crd, 'crd is')
  return crd
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

//console.log(navigator.geolocation.getCurrentPosition(success, error, options))

async function getLocationAsync() {
  // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
  const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
  console.log(permissions)
  if (status === 'granted') {
    return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
  } else {
    throw new Error('Location permission not granted');
  }
}

// getLocationAsync()

// if (process.env.NODE_ENV === 'development') {
//   require('./localSecrets'); // this will mutate the process.env object with your secrets.
// }

// const localSecrets = require('./localSecrets');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
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
  // let x = navigator.geolocation.getCurrentPosition(success, error, options);
  // console.log(x, 'x is')

    // Geolocation.getCurrentPosition(
    //     (position) => {
    //         console.log(position);
    //     },
    //     (error) => {
    //         // See error code charts below.
    //         console.log(error.code, error.message);
    //     },
    //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    // );
  
    console.log(GetCurrentLocation())
  
  return (
    // <View style={styles.container}>
    //   <MapView />
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <Text>This should appear.aaaaa</Text>
    //   {/* <MapView
    //     initialRegion={{
    //       latitude: 37.78825,
    //       longitude: -122.4324,
    //       latitudeDelta: 0.0922,
    //       longitudeDelta: 0.0421,
    //     }}
    //   /> */}
      
    //   {/* <Map /><Map /> */}
    //   {/* {map} */}
    // </View>
    <View style={styles.container}>
      {/* <Text>a</Text> */}
      
      <Map />
      <NavBar />
    {/* <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={{
        latitude: 40.7751353,
        longitude: -73.9266018,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
    </MapView> */}
    {/* <GetCurrentLocation /> */}
  </View>

  );
}


