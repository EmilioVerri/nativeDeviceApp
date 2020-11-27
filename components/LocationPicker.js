import React,{useState,useEffect} from 'react';
import { Text,Button, View,ActivityIndicator,StyleSheet,Alert} from 'react-native';
import Colors from '../constants/Colors';
//importo il componente per gestire la location
import * as Location from 'expo-location';
import *as Permissions from 'expo-permissions';

import mapPreview from './MapPreview';
import MapPreview from './MapPreview';

//LO INSERISCO QUESTO COMPONENTE DENTRO NEWPLACESCREEN
const LocationPricker=props=>{

    const [isFetching,setIsFetching]=useState(false);
    const [pickedLocation,SetPickedLocation]=useState();

    const mapPickedLocation=props.navigation.getParam('pickedLocation');//riprendo pickedLocation da MapScreen


    const {onLocationPicked}=props;//faccio la destructuring

    useEffect(()=>{
        if(mapPickedLocation){
            SetPickedLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation);//utilizzo una funzione
        }
    },[mapPickedLocation,onLocationPicked])



    const verifyPermissions=async()=>{//per verificare i permessi
        const result= await Permissions.askAsync(Permissions.LOCATION);
        if(result.status!=='granted'){
            Alert.alert('Insufficient permissions!',
            'You need to grant location permissions to use this app.',
            [{text:'Okay'}]
            );
            return false; //ritorna false perchè l'utente non ha dato il permesso
        }
        return true; //ritorna true se l'utente ha dato il permesso
     }

    const getLocationHandler=async()=>{
        const hasPermission=await verifyPermissions();//lo eseguo qua
        if(!hasPermission){
            return;
        }//se non abbiamo permessi  facciamo return e non andiamo avanti


        try{//mettiamo dentro blocco try
            setIsFetching(true);
          const location=  await Location.getCurrentPositionAsync({timeout:5000});/*richiamo questo che ci da la corretta posizione il timeout 5000 millisecond, se non ritroviamo la posizione in 5 secondi smettiamo*/
          console.log(location);
          SetPickedLocation({
              //richiamo latitudine e longitudine riprendo i nomi dai valori indicati dal console.log
              lat:location.coords.latitude,
              lng:location.coords.longitude
          });
          props.onLocationPicked({
            //richiamo latitudine e longitudine riprendo i nomi dai valori indicati dal console.log
            lat:location.coords.latitude,
            lng:location.coords.longitude
        });//utilizzo una funzione
        }catch(err){
            Alert.alert('Could not fetch location!',
            'Please try again later or pick a location on the map.',
            [{text:'Okay'}])
        }
        setIsFetching(false);

    };

    const pickOnMapHandler=()=>{
        props.navigation.navigate('Map');
    }



    return(
        <View style={styles.locationPricker}>
           <MapPreview 
           style={styles.mapPreview} 
           location={pickedLocation} 
           onPress={pickOnMapHandler}
           >
           {isFetching? (
        <ActivityIndicator size='large' color={Colors.secondo}/>
        ):(
        <Text>No location chosen yet!</Text>
        )}
           </MapPreview>
           <View style={styles.actions}>
           <Button 
            title="Get User Location" 
            color={Colors.primary}
            onPress={getLocationHandler}/>

            <Button
             title="Pick on Map" 
             color={Colors.primary}
             onPress={pickOnMapHandler} />
           </View>
           
            
        </View>
    );
}


const styles=StyleSheet.create({
    locationPricker:{
        marginBottom:15,
    },
    mapPreview:{
        marginBottom:10,
        width:'100%',
        height:150,
        borderColor:'#ccc',
        borderWidth:1,
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%',
    }
})

export default LocationPricker;


