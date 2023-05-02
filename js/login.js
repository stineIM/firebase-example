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
// Logger inn bruker med epost og passord 

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value; 
  auth.signInWithEmailAndPassword(email, password)
  // Sjekker om bruker er pålogga
  .then((userCredentials) => {
    // Oppretter ein sessionStorage variabel i nettlesaren. Denne brukes for å sjå om bruker er pålogga.
      sessionStorage.setItem("uid", userCredentials.user.uid) 
      // Redirect to home.html 
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
