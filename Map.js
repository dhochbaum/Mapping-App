import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import GetCurrentLocation from './GetCurrentLocation'
// import * as Permissions from 'expo-permissions';
// import Location from 'expo-permissions'



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

export default class Map extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        // this.state = { counter: 0 };
        // this.handleClick = this.handleClick.bind(this);
        this.state = {
            latitude: 40.7751353,
            longitude: -73.9266018,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }
          
      }
      
   async componentDidMount(props) {

    // const pos = {latitude: 0, longitude:0}

    // function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms))
    //   }

    // function success(position) {
    //     const latitude  = position.coords.latitude;
    //     const longitude = position.coords.longitude;
    //     pos.latitude = latitude
    //     pos.longitude = longitude
    //     console.log(pos, 'position is')
    //   }
    
    //   function error() {
    //     console.log('Unable to retrieve your location');
    //   }
    
    //   navigator.geolocation.getCurrentPosition(success, error);
    //   await sleep(2000)
    //   console.log(pos, 'POSITION AFTER DELAY')
    //   this.setState({latitude: pos.latitude, longitude: pos.longitude})
        this.setState(await GetCurrentLocation())

   }

  async componentDidUpdate() {
    // Typical usage (don't forget to compare props):
    // if (this.props.userID !== prevProps.userID) {
    //   this.fetchData(this.props.userID);
    // }
    // const Y = await GetCurrentLocation();
    // console.log(await Y, 'Y is')
  }



  render() {
      console.log(this.state, 'this.state')
      

      
    return (
        <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
      </MapView>
    

    );
  }
}
