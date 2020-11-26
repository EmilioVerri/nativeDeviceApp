import { ADD_PLACE, SET_PLACES } from '../actions/places-actions';
import Place from '../../models/place';


const initialState = {
    places: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PLACES:
            /**
             * utilizzo map, per mappare i dati dell'array in un nuovo array per trasformare i dati
             * 
             */
            return {
                places: action.places.map(
                    pl => new Place(pl.id.toString(), pl.title, pl.imageUri)//nel nuovo array ci saranno solo queste informazioni
                )
            }




        case ADD_PLACE:
            const newPlace = new Place(
                //new Date().toString(),non ci sarà più questo id
                action.placeData.id.toString(),
                action.placeData.title,
                action.placeData.image
            )
            return {
                places: state.places.concat(newPlace)
            }
        default:
            return state;
    }
}