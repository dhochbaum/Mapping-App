
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
                strokeColor="#000" 
                strokeWidth={6}
            />

    );
  }
}


// import React, { Component } from "react";
// import { StyleSheet, View, Text } from "react-native";
// import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

// const MapLine = props => {
//   const {history} = props
//   return (
//             <Polyline
//                 coordinates={history}
//                 strokeColor="#000" 
//                 strokeWidth={6}
//             />
//   )
// }

// export default MapLine