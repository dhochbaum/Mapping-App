import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
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
