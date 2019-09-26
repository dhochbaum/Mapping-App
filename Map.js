import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import GetCurrentLocation from './GetCurrentLocation'
import WatchLocation from './WatchLocation'
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
            history: []
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
        this.historyCheck = this.historyCheck.bind(this)
        this.getLocationAndSetState = this.getLocationAndSetState.bind(this)
        this.setState(await GetCurrentLocation())
        //this.setState(await WatchLocation())
        this.historyCheck()
        //WatchLocation()
        var myVar = setInterval(this.getLocationAndSetState, 5000);

   }

  async componentDidUpdate() {
    // Typical usage (don't forget to compare props):
    // if (this.props.userID !== prevProps.userID) {
    //   this.fetchData(this.props.userID);
    // }
    // const Y = await GetCurrentLocation();
    // console.log(await Y, 'Y is')
 
  }

  historyCheck() {
      //const checkObject = JSON.stringify({latitude: this.state.latitude, longitude: this.state.longitude});
      //if(!this.state.history.includes(checkObject)) {
    //if(!this.state.history.includes({latitude: this.state.latitude, longitude: this.state.longitude})) {
    if(!this.state.history.filter( (his) => ((his.latitude===this.state.latitude) && (his.longitude===this.state.longitude))).length) {
        const newHistory = [...this.state.history, {latitude: this.state.latitude, longitude: this.state.longitude}]
        //const newHistory = [...this.state.history, checkObject]
        this.setState({history: newHistory})
        //console.log('time to add current location to the history')
        //console.log(this.state, 'this is the new state after updating the history')
    } else {
        //console.log('no need to update the history')
    }
  }

  async getLocationAndSetState() {
    this.setState(await GetCurrentLocation())
    this.historyCheck()
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
          <Marker 
            coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude
            }}
          ></Marker>

          	<Polyline
                coordinates={this.state.history}
                strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                strokeColors={[
                    '#7F0000',
                    '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                    '#B24112',
                    '#E5845C',
                    '#238C23',
                    '#7F0000'
                ]}
                strokeWidth={6}
            />

      </MapView>

    

    );
  }
}
