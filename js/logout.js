
const auth = firebaseApp.auth(); 

function logout() {
    auth.signOut().then(() => {
        sessionStorage.removeItem("uid");
        window.location.ref ="index.html";
    });
}