import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCameraRetro, faPlayCircle, faPauseCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faStarExclamation } from '@fortawesome/pro-solid-svg-icons'
import store, {addMarker, toggleRecordingStatus, clearHistory} from './store';
import {connect} from 'react-redux'
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';




export class DisconnectedNavBar extends Component {
    constructor(props) {
        super(props);

      }
      
  async componentDidMount() {
    this.addMark = this.props.addMark.bind(this)
    this.toggleRecording = this.props.toggleRecording.bind(this)
    this.clearHistoryMarkers = this.props.clearHistoryMarkers.bind(this)
  }

  async componentDidUpdate(prevProps) { 
    
  }
  

  

  render() {

    // Guide to Google Maps Static API
    // https://developers.google.com/maps/documentation/maps-static/dev-guide
    //const pathColor = "FFFF01"
    const pathColor = "0000ff"
    const pathWeight = 6
    let history = ''
    for(let i=0; i<this.props.history.length; i++)  {
      history+= '%7C' + this.props.history[i].latitude + ',' + this.props.history[i].longitude
    }
    // Height and width not used because they are likely over allowable max
    //var {height, width} = Dimensions.get('window');


    const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?path=color:0x${pathColor}%7Cweight:${pathWeight}${history}&size=640x640&scale=2&key=AIzaSyCp0hJflAdfSvstv5oARSri8OWbbc6y3DM`
      
    return (
      // <FontAwesomeIcon icon={ faStarExclamation } color={ 'red' } size={ 64 }/>
      //   <Text>Navbar goes here
      //     Navbar goes here
      //     Navbar goes here
      //     Navbar goes here
      //     Navbar goes here
      //     Navbar goes here
          
      //     Navbar goes here
      //     Navbar goes here
      //     Navbar goes here
      //     Navbar goes here
      //     Navbar goes here
      //     Navbar goes here
      //   </Text>

      //alignItems: 'center'

        <View style={{backgroundColor: 'lightblue', flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'stretch', height: 80, alignItems: 'center'}}>
        {/* <View style={{backgroundColor: 'lightblue', width: 400, alignItems: 'center', justifyContent: 'space-evenly'}}> */}
          {
            this.props.record ? 
            <FontAwesomeIcon icon={ faPauseCircle } color={ 'green' } size={ 64 } onPress={() => this.toggleRecording() } /> :
            <FontAwesomeIcon icon={ faPlayCircle } color={ 'green' } size={ 64 } onPress={() => this.toggleRecording() } />  
          }
          {/* <FontAwesomeIcon icon={ faPlayCircle } color={ 'green' } size={ 64 } onPress={() => this.toggleRecording() } /> */}
          <FontAwesomeIcon icon={ faStarExclamation } color={ 'red' } size={ 64 } onPress={() => this.addMark() } />
          <FontAwesomeIcon icon={ faCameraRetro } color={ 'blue' } size={ 64 } onPress={() => {
            FileSystem.downloadAsync(
              staticMapUrl,
              FileSystem.documentDirectory + 'map.png'
            )
              .then(({ uri }) => {
                console.log('Finished downloading to ', uri);
                FileSystem.getContentUriAsync(uri).then(cUri => {
                  console.log(cUri);
                  IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                    data: cUri.uri,
                    flags: 1,
                  });
                });
              })
              .catch(error => {
                console.error(error);
              });            
          } } />
          <FontAwesomeIcon icon={ faTrashAlt } color={ 'red' } size={ 64 } onPress={() => this.clearHistoryMarkers() } />
          {/* <Image source={{uri: 'https://maps.googleapis.com/maps/api/staticmap?path=color:0x0000ff%7Cweight:5%7C40.737102,-73.990318%7C40.749825,-73.987963%7C40.752946,-73.987384%7C40.755823,-73.986397&size=512x512&key=AIzaSyCp0hJflAdfSvstv5oARSri8OWbbc6y3DM'}} />
          <Image
          style={{ width: 250, height: 250 }}
          source={{ uri: staticMapUrl }}
        />
          <Image
          style={{width: 50, height: 50}}
          source={require('../assets/icon.png')}
        />
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
        /> */}

        {/* <Text>Navbar goes here
        Navbar goes here
        Navbar goes here
        Navbar goes here
        Navbar goes here
        Navbar goes here
        
        Navbar goes here
        Navbar goes here
        Navbar goes here
        Navbar goes here
        Navbar goes here
        Navbar goes here
      </Text> */}
        </View>


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
    addMark: latLon => dispatch(addMarker()),
    toggleRecording: () => dispatch(toggleRecordingStatus()),
    clearHistoryMarkers: () => dispatch(clearHistory())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisconnectedNavBar);
