//lo importo per accedere al filesystem
import * as FileSystem from 'expo-file-system';
//importiamo DB
import {insertPlace,fetchPlaces} from '../../helpers/db';

export const ADD_PLACE='ADD_PLACE';

export const addPlace=(title,image)=>{
    /**faccio questa return dove metto dentro informazioni per il FileSystem 
     * funziona più o meno come ReduxThunk
     * definisco una constante newPath e gli dico dove voglio salvarlo nel filesystem
     * li salvo nel documentDirectory che è l'unico luogo in cui i file persisteranno fino a quando  l'app è accesa
     * devo però memorizzare anche il nome del file, e lo definisco dentro constante fileName split converte image in un array di segnmenti divisi da /
     * e chiamo pop che ottengo l'ultimo segmento divide il componente in / per la ricerca
     * possiamo aggiungerlo alla documentDirectory
     * 
     * mettiamo una moveAsync per spostare il file dall'app alla documentDirectory
     * contiene un oggetto con delle informazioni:
     * from: (che è dove prende immagine) e gli diciamo image
     * to:(che è dove manda immagine) e gli passo la constante newPath
     * mettiamo un await e lo avvolgiamo in una try catch
     * una volta fatto questo sappiamo che sarà ne newPath quell'elemento quindi togliamo image nella dispatch e mettiamo newPath
     * 
     * 
    */
    return async dispatch=>{
        const fileName=image.split('/').pop();
        const newPath=FileSystem.documentDirectory+fileName;

        try{
        await FileSystem.moveAsync({
            from:image,
            to:newPath
        });
        const dbResult = await insertPlace(
            title,
            newPath,
            'Dummy address',
            15.6,
            12.3
          );
          console.log(dbResult);
          dispatch({ type: ADD_PLACE, placeData: { id: dbResult.insertId, title: title, image: newPath } });
        } catch (err) {
          console.log(err);
          throw err;
        }

        //dispatch({type:ADD_PLACE, placeData:{title:title,image:/*image*/newPath}}); non sarà più qua
    };
   // return {type:ADD_PLACE, placeData:{title:title,image:image}}
};


/**definisco un azione SET_PLACES */
export const SET_PLACES='SET_PLACES';

/**definisco un nuovo actions creator loadPlaces
 * che ritorna una dispatch asincrona
 * dove dentro definisco una dispatch con il type e places impostato come array vuoto dove salverò tutti i dati
 * dentro al blocco try passiamo una constante dbResult uguale alla funzione fetchPlaces dentro alla db.js e dentro al blocco try
 * mettiamo anche la dispatch
 * vado a fare la dispatch dell'azione dentro alla PlacesListScreen
 */

 export const loadPlaces=()=>{
     return async dispatch=>{
         try{
             const dbResult=await fetchPlaces();
             console.log(dbResult);
             dispatch({type:SET_PLACES,places:dbResult.rows._array})//richiamo il valore che c'è dentro al dbResult stampato con console.log
         }catch(err){
             throw err;
         }
     };
 };