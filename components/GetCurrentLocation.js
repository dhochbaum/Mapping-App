import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView from 'react-native-maps';

  
export default async function GetCurrentLocation(){
    const pos = {latitude: 0, longitude:0}

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      }

    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        pos.latitude = latitude
        pos.longitude = longitude
        //console.log(pos, 'position is')
        //console.log(position, 'position is')
      }
    
      function error() {
        console.log('Unable to retrieve your location');
      }
      
      const options = { enableHighAccuracy: true }

      navigator.geolocation.getCurrentPosition(success, error, options);
      await sleep(2000)
      //console.log(pos, 'POSITION AFTER DELAY')
      //this.setState({latitude: pos.latitude, longitude: pos.longitude})
      return pos;

    
}
