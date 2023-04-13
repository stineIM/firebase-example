// HER LEGGER DU INN INFOEN DIN FRÅ FIREBASE

const firebaseApp = firebase.initializeApp({
    apiKey: //DIN API KEY,
    authDomain: // DIN,
    projectId: //DIN,
    storageBucket: //DIN ,
    messagingSenderId: //DIN,
    appId: // DIN
});
///////////////////////////////////////////////////////////

/* Firebase config */
const db = firebaseApp.firestore();
const auth = firebaseApp.auth(); 

// Henter info frå input-feltet name, og oppretter bruker i collection "users" 
function createUser() {
    const name = document.getElementById("name").value; 
    firebase.firestore().collection("users").doc().set({
            name: name
        })
        .then(function () {
           console.log("bruker opprettet");
        })
    .catch((e) => {
        alert(e.message)
        console.log(e.code); 
        console.log(e.message);
    });
    
}

