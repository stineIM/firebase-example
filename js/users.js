
const firebaseApp = firebase.initializeApp({
    apiKey: // DIN,
    authDomain: // DIN,
    projectId:// DIN,
    storageBucket: // DIN
    messagingSenderId: // DIN
    appId: // DIN
});
///////////////////////////////////////////////////////////

/* Firebase config */
const db = firebaseApp.firestore();
const userid = sessionStorage.getItem("uid");
let docid = "";

// Denne henter alle brukerene i collection "users". 
function getUsers() {
    let users = document.getElementById("usertable").innerHTML;
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            docid = "'" + doc.id + "'";          
            users += "<tr>" +
                "<td>" + doc.data().firstname + "</td>" +
                "<td>" + doc.data().lastname + "</td>" +
                "<td>" + doc.data().address + "</td>" +
                "<td>" + doc.data().zip + "</td>" +
                "<td>" + doc.data().city + "</td>" +
                '<td id="tableLink" onclick="showUpdateForm(' + docid + ')"> Endre bruker </td>' +
                '<td id="tableLink" onclick="removeUser(' + docid + ')"> Slett bruker </td>' +
                "</tr>";
                
        });
        document.getElementById("usertable").innerHTML = users;
    });
}
getUsers();

// OPPDATERE ELEMENT I DATABASE 
function updateUser(docid) {
    var user = db.collection("users").doc(docid);
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const address = document.getElementById("address").value;
    const zip = document.getElementById("zip").value;
    const city = document.getElementById("city").value;

    // Oppdater bruker i firestore
    return user.update({
        firstname: fname,
        lastname: lname,
        address: address,
        zip: zip,
        city: city
    })
        .then(() => {
            console.log("Document successfully updated!");
            // Redirecter til users.html 
            window.location.href = "./users.html";
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}

// Denne viser brukeren sin informasjon som ligger i databasen.
function showUpdateForm(docid) {
    console.log(docid);
    document.getElementById("userform").style.display = "block";
    document.getElementById("btnUpdate").onclick = function () { updateUser(docid) };
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Sjekker om doc-iden er den samme for den brukaren me skal redigere 
            if (docid == doc.id) {
                console.log("hei");
                document.getElementById("fname").value = doc.data().firstname;
                document.getElementById("lname").value = doc.data().lastname;
                document.getElementById("address").value = doc.data().address;
                document.getElementById("city").value = doc.data().city;
                document.getElementById("zip").value = doc.data().zip;
            }
        });
    })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

// SLETTE ELEMENT I DATABASE 
// Docid er dokument-id
function removeUser(docid) {
    db.collection("users").doc(docid).delete().then(() => {
        console.log("Document successfully deleted!");
        alert("Bruker er slettet");
        window.location.href="users.html";
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}