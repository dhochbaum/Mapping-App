import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'
import { faStarExclamation } from '@fortawesome/pro-solid-svg-icons'
import store, {addMarker} from './store';
import {connect} from 'react-redux'


export class DisconnectedNavBar extends Component {
    constructor(props) {
        super(props);

      }
      
  async componentDidMount() {
    this.addMark = this.props.addMark.bind(this)
  }

  async componentDidUpdate(prevProps) {
    
  }
  
/*   takeSnapshot () {
    console.log('taking snapshot')
    // 'takeSnapshot' takes a config object with the
    // following options
    const snapshot = this.map.takeSnapshot({
      // width: 300,      // optional, when omitted the view-width is used
      // height: 300,     // optional, when omitted the view-height is used
      // region: {..},    // iOS only, optional region to render
      format: 'png',   // image formats: 'png', 'jpg' (default: 'png')
      // quality: 0.8,    // image quality: 0..1 (only relevant for jpg, default: 1)
      result: 'file'   // result types: 'file', 'base64' (default: 'file')
    });
    snapshot.then((uri) => {
      this.setState({ mapSnapshot: uri });
    });
  } */
  

  render() {
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
        <View onClick={() => console.log('click') }>
          <FontAwesomeIcon icon={ faStarExclamation } color={ 'red' } size={ 64 } onPress={() => this.addMark() } />
          <FontAwesomeIcon icon={ faCameraRetro } color={ 'blue' } size={ 64 } onPress={() => this.takeSnapshot() } />
        <Text>Navbar goes here
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
      </Text>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisconnectedNavBar);
