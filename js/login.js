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
// Logger inn bruker med epost og passord 

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value; 
  auth.signInWithEmailAndPassword(email, password)
  .then((userCredentials) => {
      sessionStorage.setItem("uid", userCredentials.user.uid)
      window.location.href = "./home.html"
  })
  .catch((error) => {
      console.error("Failed: " + error.message); 
  })
}

// Oppretter bruker med epost og passord 

function signUp() {
  const email = document.getElementById("new_email").value;
  const password = document.getElementById("new_password").value; 
  const name = document.getElementById("name").value; 

  auth.createUserWithEmailAndPassword(email, password)
  // Lagrer også brukeren i collection "users"
   .then((userCredentials) => {
      firebase.firestore().collection("users").doc().set({
          name: name, 
          email: email,
          userId: userCredentials.user.uid
      })
      .then(function () {
          window.location.href = "./home.html"; 
      })

      console.log(res.userCredentials)
  })
   
  .catch((err) => {
      alert(err.message)
      console.log(err.code); 
      console.log(err.message);
  });
  
}
