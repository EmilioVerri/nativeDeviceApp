import React from 'react';
import{View,Button,Text,StyleSheet,Image,Alert} from 'react-native';
import Colors from '../constants/Colors';

//importiamo ImagePicker che serve per l'attivazione della fotocamera
import * as ImagePicker from 'expo-image-picker';
//importo Permissions che serve per chiedere all'utente i permessi per utilizzare la fotocamera
import * as Permissions from 'expo-permissions';


const ImgPicker=props=>{
    /**definisco una nuova constante per chiedere i permessi 
     * dentro Permissions.askAsync dobbiamo specificare quali permessi vogliamo
     * è un valore asincrono quindi uso async e await
     * salvo tutto dentro alla constante result
     * se la constante result è uguale a non permesso ritorna un alert
    */
    const verifyPermissions=async()=>{
       const result= await Permissions.askAsync(Permissions.CAMERA,Permissions.CAMERA_ROLL);
       if(result.status!=='granted'){
           Alert.alert('Insufficient permissions!',
           'You need to grant camera permissions to use this app.',
           [{text:'Okay'}]
           );
           return false; //ritorna false perchè l'utente non ha dato il permesso
       }
       return true; //ritorna true se l'utente ha dato il permesso
    }


    /*sarà la funzione che aprirà la fotocamera e questa funzione la legherò alla onPress del button
    aprirà la fotocamera ImagePicker.launchCameraAsync();
    definisco valore asyncrono con async e await
    archivio dentro hasPermission la funzione verifyPermission
    se hasPermission è false faccio return così non apre la fotocamera*/
    const  takeImageHandler=async()=> {
       const hasPermission=await verifyPermissions();
       if(!hasPermission){
           return;
       }
        ImagePicker.launchCameraAsync();
    }



    return(
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                <Text>No image picked yet.</Text>
                <Image style={styles.Image}/>
                <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />
            </View>
        </View>
    );
};

const styles=StyleSheet.create({
    imagePicker:{
        alignItems:'center'
    },
    imagePreview:{
        width:'100%',
        height:200,
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#ccc',
        borderWidth:1
    },
    image:{
        width:'100%',
        height:'100%'
    }
})

export default ImgPicker;