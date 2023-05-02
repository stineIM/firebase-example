const db = firebaseApp.firestore();

function getMessages() {
    let messagesText = ""; 
    db.collection("messages").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            index = index + 1; 
            let createdDate = doc.data().created; 
            if (!createdDate) {
                createdDate = ""; 
            }
            messagesText += "<div class='messageBox'><h3>" + doc.data().title + "</h3><p>" + doc.data().message + "</p><div class='createdDate'>Opprettet: " + createdDate + "</div></div>";
        });
        document.getElementById("messageContainer").innerHTML = messagesText;
    });    
}

getMessages();