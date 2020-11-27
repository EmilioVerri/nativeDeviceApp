import React,{useState,useEffect,useCallback} from 'react';
import {View,Text,StyleSheet,Platform,TouchableOpacity,Alert} from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import Colors from '../constants/Colors';


const MapScreen=props=>{

    const initialLocation=props.navigation.getParam('initialLocation');//lo richiamo dalla PlaceDetailScreen
    const readonly=props.navigation.getParam('readonly');//lo richiamo dalla PlaceDetailScreen

    const [selectedLocation,setSelectedLocation]=useState(initialLocation);

    const mapRegion={//se abbiamo un initialLocation stampiamo quel posto con sopra il marker senò stampiamo queste coordinate
        latitude:initialLocation?initialLocation.lat:37.78,
        longitude:initialLocation?initialLocation.lng:-122.43,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421
    };//region è un oggetto con 4 proprietà

    const selectLocationHandler=event=>{
        if(readonly){//se è true non lascio cercare un altra posizione
            return;
        }
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
    const readonly=navData.navigation.getParam('readonly');//lo richiamo dalla PlaceDetailScreen
    if(readonly){
        return{};//se siamo in modalità di solo lettura ritorna un oggetto vuoto
    }
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