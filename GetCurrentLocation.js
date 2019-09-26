import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView from 'react-native-maps';

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    var crd = pos.coords;
  
    // console.log('Your current position is:');
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);

    console.log(crd, ' are the results of fetching the current position')
    return crd
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
export default function GetCurrentLocation(){
    // let x = await navigator.geolocation.getCurrentPosition(success, error, options);
    // // console.log(x, 'x is')
    // return await x
    return navigator.geolocation.getCurrentPosition(success, error, options);
    
}

//   let crd = navigator.geolocation.getCurrentPosition(success, error, options);
//let crd = {latitude: 40.7751353, longitude: -73.9266018}

//   export default class GetCurrentLocation extends Component {
//     componentDidMount() {

//     }
  
//     render() {
//       return (
          
//           <MapView
//           initialRegion={{
//             latitude: crd.latitude,
//             longitude: crd.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         />
      
  
//       );
//     }
//   }