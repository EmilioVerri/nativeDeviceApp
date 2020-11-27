import React,{useState,useEffect,useCallback} from 'react';
import {View,Text,StyleSheet,Platform,TouchableOpacity,Alert} from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import Colors from '../constants/Colors';


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
  
const savePickedLocationHandler=useCallback(()=>{
    if(!selectedLocation){
        Alert.alert('non è stata inserita nessun marcher di navigazione','ritenta ed inseriscine uno cliccando il posto che vuoi sulla mappa',[{text:'Okay'}])
        return;
    }
    props.navigation.navigate('NewPlace',{pickedLocation:selectedLocation});//preso dal PlaceNavigator usando la navigazione posso passargli alcuni parametri alla NewPlaceScreen
},[selectedLocation])


useEffect(()=>{
    props.navigation.setParams({saveLocation:savePickedLocationHandler})
},[savePickedLocationHandler])

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


MapScreen.navigationOptions=navData=>{
    const saveFn=navData.navigation.getParam('saveLocation');//richiamo dalla useEffect la saveLocation
    return{
        headerRight:(
        <TouchableOpacity style={styles.headerButton} onPress={saveFn}>{/*richiamo la constante al tocco saveFn*/}
            <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
        )
    };
};



const styles=StyleSheet.create({
    map:{
        flex:1
    },
    headerButton:{
        marginHorizontal:20
    },
    headerButtonText:{
        fontSize:16,
        color:Platform.OS==='android'?'white':Colors.primary
    }
});


export default MapScreen;