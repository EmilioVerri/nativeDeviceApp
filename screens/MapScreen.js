import React,{useState} from 'react';
import {View,Text,StyleSheet,Platform} from 'react-native';
import MapView,{Marker} from 'react-native-maps';


const MapScreen=props=>{
    const [selectedLocation,setSelectedLocation]=useState();

    const mapRegion={
        latitude:37.78,
        longitude:-122.43,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421
    };//region è un oggetto con 4 proprietà

    const selectLocationHandler=event=>{
       // console.log(event); prendiamo da qua il valore nativeEvent.coordinate.latitude da event
        setSelectedLocation({
            lat:event.nativeEvent.coordinate.latitude,
            lng:event.nativeEvent.coordinate.longitude
        })
    };


    let markerCoordinate;

    if(selectedLocation){
        markerCoordinate={
            latitude:selectedLocation.lat,
            longitude:selectedLocation.lng
        }
    }

    return(
        <MapView 
        style={styles.map} 
        region={mapRegion} 
        onPress={selectLocationHandler}>
            {markerCoordinate&&<Marker title='Picked Location' coordinate={markerCoordinate}></Marker>}
        </MapView>
    )
}



const styles=StyleSheet.create({
    map:{
        flex:1
    }
});


export default MapScreen;