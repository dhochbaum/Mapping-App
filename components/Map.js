import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import GetCurrentLocation from './GetCurrentLocation'
import WatchLocation from './WatchLocation'
// import * as Permissions from 'expo-permissions';
// import Location from 'expo-permissions'
import NavBar from './NavBar'
import store, {increment, recordMove} from './store';
import {connect} from 'react-redux'
import { SvgXml } from 'react-native-svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStreetView } from '@fortawesome/free-solid-svg-icons'
import { faStarExclamation } from '@fortawesome/pro-solid-svg-icons'
import MapLine from './MapLine'

const yourLocationImg = require("../assets/street-view-duotone.svg")



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

export class DisconnectedMap extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        // this.state = { counter: 0 };
        // this.handleClick = this.handleClick.bind(this);
        // this.state = {
        //     latitude: 40.7751353,
        //     longitude: -73.9266018,
        //     latitudeDelta: 0.015,
        //     longitudeDelta: 0.0121,
        //     history: []
        //   }
        this.state = store.getState();

          
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
        this.recordMove = this.props.recordMove.bind(this)
        //this.setState(await GetCurrentLocation())
        //this.setState(await WatchLocation())
        //this.historyCheck()
        //WatchLocation()
        console.log('initial location is', await GetCurrentLocation())
        const initialLocation = await GetCurrentLocation()
        this.recordMove(initialLocation)

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

  /* historyCheck() {
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
  } */

  historyCheck(currentLocation) {
    if((currentLocation===undefined)||((currentLocation.latitude===0)&&(currentLocation.longitude===0))) { 
      console.log('error fetching location')
    } else if(!this.state.history.filter( (his) => ((his.latitude===currentLocation.latitude) && (his.longitude===currentLocation.longitude))).length) {
        console.log('history firing properly')
        this.recordMove(currentLocation)
    } else {
        //console.log('no need to update the history')
    }
    console.log(this.props, 'new state')
  }

  async getLocationAndSetState() {
    if(this.props.record) {
      this.historyCheck(await GetCurrentLocation())
    }
    
  }



  render() {
      console.log(this.state, 'this.state')
      

      
    return (
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
          <Marker 
            coordinate={{
                latitude: this.props.latitude,
                longitude: this.props.longitude
            }}
          >
            <FontAwesomeIcon icon={ faStreetView } color={ 'red' } size={ 32 }/>
            {/* <Text></Text> */}
            {/* <SvgXml width="200" height="200" xml={yourLocationImg} /> */}
            {/* <Svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="street-view" class="svg-inline--fa fa-street-view fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g class="fa-group"><path class="fa-secondary" fill="currentColor" d="M512 416c0 53-114.62 96-256 96S0 469 0 416c0-37.95 58.87-70.66 144.1-86.24a63.94 63.94 0 0 0 15.9 13.65v22.94C93.48 375.7 48 394.4 48 416c0 30.93 93.12 56 208 56s208-25.07 208-56c0-21.6-45.48-40.31-112-49.65v-22.94a63.94 63.94 0 0 0 15.9-13.65C453.13 345.34 512 378.05 512 416z" opacity="0.4"></path><path class="fa-primary" fill="currentColor" d="M256 128a64 64 0 1 0-64-64 64 64 0 0 0 64 64zm48 16h-11.8a85.9 85.9 0 0 1-72.4 0H208a48 48 0 0 0-48 48v96a32 32 0 0 0 32 32v96a32 32 0 0 0 32 32h64a32 32 0 0 0 32-32v-96a32 32 0 0 0 32-32v-96a48 48 0 0 0-48-48z"></path></g></svg> */}
            {/* <SvgUri
              width="100%"
              height="100%"
              uri="../assets/street-view-duotone.svg"
            /> */}
              {/* <Img href="../assets/street-view-duotone.svg" /> */}
            

          </Marker>

          	{/* <Polyline
                coordinates={this.props.history}
                strokeColor="#000" 
                strokeWidth={6}
            /> */}
            <MapLine history={this.props.history} />
{/* <NavBar props={this.props} /> */}
      </MapView>

    );
  }
}


const mapStateToProps = state => {
  return {
    latitude: state.latitude,
    longitude: state.longitude,
    latitudeDelta: state.latitudeDelta,
    longitudeDelta: state.longitudeDelta,
    history: state.history,
    record: state.record,
    markers: state.markers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    recordMove: latLon => dispatch(recordMove(latLon)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisconnectedMap);
