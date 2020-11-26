import React,{useState} from 'react';
import {View,Text,StyleSheet,Platform,TextInput,ScrollView,Button} from 'react-native';
import Colors from'../constants/Colors';
import LocationPicker from '../components/LocationPicker';

import * as placesActions from '../store/actions/places-actions';
import {useDispatch} from 'react-redux';

//Importo ImagePiscker dove dentro c'è la parte della fotocamera
import ImagePicker from '../components/ImagePicker';

const NewPlaceScreen=props=>{

    const[titleValue,setTitleValue]=useState('');
    //faccio un altro useState per memorizzare l'immagine che gli passo dalla ImagePicker
    const[selectedImage,setSelectedImage]=useState();

    const dispatch=useDispatch();

    const titleChangeHandler=text=>{
        setTitleValue(text);
    }

    const savePlaceHandler=()=>{
        //passo anche all'azione la selectedImage
        dispatch(placesActions.addPlace(titleValue,selectedImage));
        props.navigation.goBack();
    }

    /**definisco nuova constante imageTakenHandler che ha un campo di input e dentro gli salvo 
     * setSelectedImage(con dentro imagePath)
    */
    const imageTakenHandler=imagePath=>{
        setSelectedImage(imagePath);
    }


    return(
        <ScrollView>
        <View style={styles.form}>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue}/>
            <ImagePicker onImageTake={imageTakenHandler}/>{/*recupero informazioni salvate*/}
            <LocationPicker navigation={props.navigation}/>{/*utilizzo questo puntello di navigazione per rimediare a degli errori*/}
            <Button 
            title="Save Place" 
            color={Colors.primary} 
            onPress={savePlaceHandler}/>
        </View>
        </ScrollView>
    )
}


NewPlaceScreen.navigationOptions={
    headerTitle:'Add Place'
};


const styles=StyleSheet.create({
    form:{
        margin:30
    },
    label:{
        fontSize:18,
        marginBottom:15
    },
    textInput:{
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        marginBottom:15,
        paddingVertical:4,
        paddingHorizontal:2
    }
});


export default NewPlaceScreen;