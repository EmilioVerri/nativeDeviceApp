import React from 'react';
import {View,Text,StyleSheet,Platform} from 'react-native';


const PlaceDetailScreen=props=>{
    return(
        <View>
            <Text>PlaceDetailScreen</Text>
        </View>
    )
}


PlaceDetailScreen.navigationOptions=navData=>{
    return{
        headerTitle:navData.navigation.getParam('placeTitle')
    }
}



const styles=StyleSheet.create({});


export default PlaceDetailScreen;