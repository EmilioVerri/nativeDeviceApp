import React from 'react';
import {View,Text,StyleSheet,Platform} from 'react-native';
import MapView from 'react-native-maps';


const MapScreen=props=>{
    const mapRegion={
        latitude:37.78,
        longitude:-122.43,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421
    };//region è un oggetto con 4 proprietà
    return(
        <MapView style={styles.map} region={mapRegion}/>
    )
}



const styles=StyleSheet.create({
    map:{
        flex:1
    }
});


export default MapScreen;