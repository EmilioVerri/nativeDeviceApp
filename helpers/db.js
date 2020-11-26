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
            tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL,address TEXT NOT NULL,lat REAL NOT NULL, lng REAL NOT NULL);',
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


/**
 * creo una nuova constante insertPlace dove gli passo i valori che c'erano nel db tranne l'id come argomento
 * all'interno copio quello che ho definito sopra, ma nell'eseguire la tabella scrivo:
 * e inserisco dentro al DB title,imageUri,address,lat,lng e con VALUES specifico i valori nelle rispettive colonne utilizzo back-tips per un valore dinamico ALT+96
 * utilizzo 5 punti interrogativi per evitare le SQL injection cioè l'utente che inserisce codice SQL malevolo per modificare DB
 * e i valori li passo dentro le quadre del secondo argomento così evitiamo qualsiasi attacco
 * il primo argomento della funzione success è _, come secondo argomento è result e glielo passo anche a resolve
 * quindi adesso la constante insertPlace la chiamiamo dentro l'azione places
 */
export const insertPlace=(title,imageUri,address,lat,lng)=>{
    const promise=new Promise((resolve,reject)=>{
        db.transaction((tx)=>{
            tx.executeSql(
                `INSERT INTO places (title,imageUri,address,lat,lng) VALUES(?,?,?,?,?);`,
            [title,imageUri,address,lat,lng],

            (_,result)=>{
                resolve(result);
            },

            (_,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise; // ritorno all'esterno la constante promise
};