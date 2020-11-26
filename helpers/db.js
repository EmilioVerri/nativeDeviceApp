//metterò qua la mia logica DB
//importo SQLite
import * as SQLite from 'expo-sqlite';

/**
 * si connette a questo DB o se non c'è lo crea appena lancia l'app
 * esporto la constante init che inizializzerà il nostro DB e dentro li creerò una tabella di base per il DB
 * transaction prende una funzione come argomento che ci da accesso all'oggetto transaction che crea per me
 * la transaction evita anche di eseguire delle query sbagliate per evitare errori dentro al DB
 * executeSql() ci permette di scrivere la query in stringa
 * creo una tabella se non esiste e la chiamo places e dentro alle parentesi definisco le colonne con i vari elementi
 * lat e lng si fanno sempre ed esprimono latitudine e longitudine
 * prende come secondo argomento un array di argomenti
 * 
 * e poi abbiamo 2 funzioni:
 * 1) funzione successo
 * 2) funzione errore
 * 
 * definisco un nuovo oggetto promessa e lo salvo nella constante promise
 * che prende una funzione, come argomenti avremo resolve e reject e muoviamo tutto il transaction dentro ad essa
 * richiamo questo DB dentro all'app.js
 */
const db=SQLite.openDatabase('places.db');

export const init=()=>{
    const promise=new Promise((resolve,reject)=>{
        db.transaction((tx)=>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUrl TEXT NOT NULL,address TEXT NOT NULL,lat REAL NOT NULL, lng REAL NOT NULL);',
            [],

            ()=>{
                resolve();
            },

            (_,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise; // ritorno all'esterno la constante promise
};