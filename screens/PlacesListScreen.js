import React from 'react';
import {View,Text,StyleSheet,Platform,FlatList} from 'react-native';
import HeaderButton from '../components/HeaderButton';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';
import PlaceItem from '../components/PlaceItem';


const PlacesListScreen=props=>{
    const places=useSelector(state=>state.places.places);
    return(
        
            <FlatList 
            data={places}//itemData prende i valori da da places dentro al place model
            keyExtractor={item=>item.id}
            renderItem={itemData=>(
            <PlaceItem 
            title={itemData.item.title}
            image={itemData.item.imageUri}
            address={null}
            onSelect={()=>{
                props.navigation.navigate('PlaceDetail',{
                placeTitle:itemData.item.title,
                placeId:itemData.item.id
            })
        }}
            />
            )}
            />
        
    )
}


PlacesListScreen.navigationOptions=navData=>{
    return {
        headerTitle: 'All Places',
        headerRight: (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Add Place"
              iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
              onPress={() => {
                navData.navigation.navigate('NewPlace');
              }}
            />
          </HeaderButtons>
        )
      };
    };


const styles=StyleSheet.create({});


export default PlacesListScreen;