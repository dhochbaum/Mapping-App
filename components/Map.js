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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStreetView } from '@fortawesome/free-solid-svg-icons'
import { faStarExclamation } from '@fortawesome/pro-solid-svg-icons'
import MapLine from './MapLine'




const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]

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

        this.state = store.getState();

          
      }
      
   async componentDidMount(props) {

        this.historyCheck = this.historyCheck.bind(this)
        this.getLocationAndSetState = this.getLocationAndSetState.bind(this)
        this.recordMove = this.props.recordMove.bind(this)

        console.log('initial location is', await GetCurrentLocation())
        const initialLocation = await GetCurrentLocation()
        this.recordMove(initialLocation)

        var myVar = setInterval(this.getLocationAndSetState, 5000);

   }

  async componentDidUpdate() {

 
  }


  historyCheck(currentLocation) {
    if((currentLocation===undefined)||((currentLocation.latitude===0)&&(currentLocation.longitude===0))) { 
      console.log('error fetching location')
    } else if(!this.state.history.filter( (his) => ((his.latitude===currentLocation.latitude) && (his.longitude===currentLocation.longitude))).length) {
        this.recordMove(currentLocation)
    } else {
        //console.log('no need to update the history')
    }
    
  }

  async getLocationAndSetState() {
    if(this.props.record) {
      this.historyCheck(await GetCurrentLocation())
    }
    
  }





  render() {
      

      const pathColor = "FFFF01"
      const pathWeight = 6
      
      const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?path=color:0x${pathColor}%7C${pathWeight}:5%7C40.737102,-73.990318%7C40.749825,-73.987963%7C40.752946,-73.987384%7C40.755823,-73.986397&size=512x512&key=AIzaSyCp0hJflAdfSvstv5oARSri8OWbbc6y3DM`
      

      
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
        customMapStyle={mapStyle}
        onPress={() => console.log('map clicked!')}
        
      >
        
          <Marker 
            coordinate={{
                latitude: this.props.latitude,
                longitude: this.props.longitude
            }}
          >
            <FontAwesomeIcon icon={ faStreetView } color={ 'red' } size={ 32 }/>


          </Marker>

          {this.props.markers.map((marker) => {
            return <Marker key={marker.latitude+marker.longitude}coordinate={{latitude: marker.latitude, longitude: marker.longitude}}><FontAwesomeIcon icon={ faStarExclamation } color={ 'red' } size={ 32 }/></Marker>
          })}

            <MapLine history={this.props.history} />

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
