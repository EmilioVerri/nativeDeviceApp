import React from 'react';

import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/reducer/places-reducer';

//importo db
import {init} from './helpers/db';

init().then(()=>{
    console.log('Initialize DB');
})
.catch(err=>{
    console.log('Initializin db failed.');
    console.log(err);
});

const rootReducer=combineReducers({
    places:placesReducer
});

const store=createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  return (
        <Provider store={store}>
        <PlacesNavigator />
        </Provider>
  );
}

