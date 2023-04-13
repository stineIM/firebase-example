// HER LEGGER DU INN INFOEN DIN FRÅ FIREBASE

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDIRcBjGqjclcEAZJWK2m1teB8NM41YUuE",
    authDomain: "imchat-11bcc.firebaseapp.com",
    projectId: "imchat-11bcc",
    storageBucket: "imchat-11bcc.appspot.com",
    messagingSenderId: "636455948393",
    appId: "1:636455948393:web:b42b5458aaddf1214e92f8"
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

