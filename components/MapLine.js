
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';




export default class MapLine extends Component {
    constructor(props) {
        super(props);
      }

  render() {
    return (
        <Polyline
                coordinates={this.props.history}
                strokeColor="#FFFF01" 
                strokeWidth={6}
            />

    );
  }
}
