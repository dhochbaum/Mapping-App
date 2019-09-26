import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
//import GetCurrentLocation from './GetCurrentLocation'
// import * as Permissions from 'expo-permissions';
// import Location from 'expo-permissions'

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    var crd = pos.coords;

    console.log(crd, ' are the results of fetching the current position')
    
    return crd
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
export function getCurrentLocation(){
    // let x = await navigator.geolocation.getCurrentPosition(success, error, options);
    // // console.log(x, 'x is')
    // return await x
    return navigator.geolocation.getCurrentPosition(success, error, options);
    
}

/* navigator.geolocation.getCurrentPosition(function(pos){
    //success
    var crd = pos.coords;
    console.log(crd, ' are the results of fetching the current position')
    return crd
}, function(err){
    //error
    console.warn(`ERROR(${err.code}): ${err.message}`);
}, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }); */

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
          //this.handleFetchLocation = this.handleFetchLocation.bind(this)
          this.handleSetState = this.handleSetState.bind(this)
      }
      
   async componentDidMount(props) {

    const pos = {latitude: 0, longitude:0}

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      }

    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        pos.latitude = latitude
        pos.longitude = longitude
        console.log(pos, 'position is')
      }
    
      function error() {
        console.log('Unable to retrieve your location');
      }
    
      navigator.geolocation.getCurrentPosition(success, error);
      await sleep(2000)
      console.log(pos, 'POSITION AFTER DELAY')
      this.setState({latitude: pos.latitude, longitude: pos.longitude})

    
    // const x = getCurrentLocation();
   /*  function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      }
      
    //   console.log('This is a message')
    //   await sleep(5000)
    //   console.log('This is a message 5 seconds into the future')
    //this.handleSetState()
    let holdLocation;
     await navigator.geolocation.getCurrentPosition(async function(pos){
                //success
                await sleep(5000)
                var crd = pos.coords;
                console.log(pos.coords, ' are the results of fetching the current position')
                holdLocation = {...pos.coords};
                //this.setState({latitude: pos.coords.latitude, longitude: pos.coords.longitude})
                //this.handleSetState({latitude: pos.coords.latitude, longitude: pos.coords.longitude})
                
                // this.setState({
                //     latitude: 40.7751353,
                //     longitude: -73.9266018,
                //     latitudeDelta: 6.6666,
                //     longitudeDelta: 0.0121,
                //   })
                // console.log('this is ', this)
                return crd
            }, function(err){
                //error
                console.warn(`ERROR(${err.code}): ${err.message}`);
            }, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });  
        
//             let h = await this.handleFetchLocation()
//     console.log(await h, 'h is DOES THIS EVER RUN')        
//     // console.log(await x, 'x is')
//     // this.setState(await x)
//      setInterval(function(){ console.log('holdLocation resolves to', holdLocation); }, 10000);
// //aaaaa
//     // const {latitude, longitude} = getCurrentLocation();
//     // console.log(await latitude, 'latitude is')
//     // this.setState(await latitude)
//     // setInterval(function(){ console.log('latitude resolves to', latitude); }, 10000);

//     // var watchID = navigator.geolocation.watchPosition(function(position) {
//     //     console.log(position)
//     //     this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude});
//     //   }, function(err) {console.warn(`ERROR(${err.code}): ${err.message}`)});
await sleep(5000)
      console.log(holdLocation, 'holdLocation has it!') */
   }

  async componentDidUpdate() {
    // Typical usage (don't forget to compare props):
    // if (this.props.userID !== prevProps.userID) {
    //   this.fetchData(this.props.userID);
    // }
    // const Y = await GetCurrentLocation();
    // console.log(await Y, 'Y is')
  }

  async handleSetState(state) {
    await navigator.geolocation.getCurrentPosition(function(pos){
        //success
        var crd = pos.coords;
        console.log(pos.coords, ' are the results of fetching the current position')
        holdLocation = {...pos.coords};
        //this.setState({latitude: pos.coords.latitude, longitude: pos.coords.longitude})
        this.setState({latitude: pos.coords.latitude, longitude: pos.coords.longitude})
        // this.setState({
        //     latitude: 40.7751353,
        //     longitude: -73.9266018,
        //     latitudeDelta: 6.6666,
        //     longitudeDelta: 0.0121,
        //   })
        // console.log('this is ', this)
        return crd
    }, function(err){
        //error
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }); 
    //   this.setState(state)
    //   console.log('handleSetState has set the state to', this.state)
  }
  
/*   async handleFetchLocation() {
      console.log('HANDLE FETCH RUNNING')
      let holdLocation;
    await navigator.geolocation.getCurrentPosition(function(pos){
        //success
        var crd = pos.coords;
        console.log(pos.coords, ' are the results of fetching the current position')
        holdLocation = {...pos.coords};
        //this.setState({latitude: pos.coords.latitude, longitude: pos.coords.longitude})
        // this.setState({
        //     latitude: 40.7751353,
        //     longitude: -73.9266018,
        //     latitudeDelta: 6.6666,
        //     longitudeDelta: 0.0121,
        //   })
        // console.log('this is ', this)
        return crd
    }, function(err){
        //error
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });
    return holdLocation;
  } */

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
